import express from 'express'
import path, { dirname } from 'path'
import cookieParser from 'cookie-parser'
import applicationConfig from './configuration/application-config.js'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import CourseRepository from './repositories/course-repository.js'
import CourseDtoMapper from './mapper/course-dto-mapper.js'
import ConsoleLogger from './services/console-logger.js'
import RedisCachingService from './services/redis-caching-service.js'
import DiscordLogger from './services/discord-logger.js'
import AssignmentRepository from './repositories/assignment-repository.js'
import AssignmentsRouter from './routes/assignments.js'
import AssignmentDtoMapper from './mapper/assignment-dto-mapper.js'
import GenericErrorHandler from './error-handlers/generic-error-handler.js'
import CoursesRouter from './routes/courses.js'
import AssignmentUseCases from './use-cases/assignments.js'
import CourseUseCases from './use-cases/courses.js'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { ApolloServer } from 'apollo-server-express'
import graphqlResolvers from './graphql/resolvers.js'
import TypeDefs from './graphql/typedefs.js'
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import { PubSub } from 'graphql-subscriptions'

mongoose.connect(applicationConfig.mongodbConnection)

const app = express()
const httpServer = createServer(app)

// Configure services and repositories.
let loggingService = null
switch (applicationConfig.loggerType) {
    case 'Discord':
        loggingService = new DiscordLogger(applicationConfig)
        break
    case 'Console':
        loggingService = new ConsoleLogger()
        break
    default:
        console.warn('Logger not configured.')
        break
}

const cachingService = new RedisCachingService(applicationConfig)

const pubsub = new PubSub()

let courseRepository = new CourseRepository()

let assignmentRepository = new AssignmentRepository()

const courseUseCases = new CourseUseCases(
    courseRepository,
    cachingService,
    loggingService,
    pubsub,
    CourseDtoMapper
)

const assignmentUseCases = new AssignmentUseCases(
    assignmentRepository,
    pubsub,
    AssignmentDtoMapper,
    cachingService,
    loggingService
)

// Configure middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'public')))

// Set API routes.
app.use(
    '/api', 
    CoursesRouter(courseUseCases, CourseDtoMapper)
)
app.use(
    '/api', 
    AssignmentsRouter(assignmentUseCases, AssignmentDtoMapper)
)

// Configure GraphQL
const graphqlSchema = makeExecutableSchema({
    typeDefs: TypeDefs,
    resolvers: graphqlResolvers(
        courseUseCases, 
        CourseDtoMapper, 
        assignmentUseCases, 
        AssignmentDtoMapper,
        pubsub
    )
})

const subscriptionServer = SubscriptionServer.create(
    { schema: graphqlSchema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
)

const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    plugins: [{
        async serverWillStart() {
            return {
                async drainServer() {
                    subscriptionServer.close()
                }
            }
        }
    }],
})

apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app })

    // In case of an invalid url, send the index page.
    app.use('*', (req, res) => {
        res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), 'public', 'index.html'))
    })
})

// Configure error handlers.
app.use(GenericErrorHandler(loggingService))

// Start server.
httpServer.listen(applicationConfig.port, () => {
    console.log(`Server started. Listening on port ${applicationConfig.port}.`)
})

export default app