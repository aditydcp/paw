import EventTopics from "../common/event-topics.js"
import dateScalar from './scalars/date-scalar.js'

const graphqlResolvers = (
    courseUseCases, 
    courseDtoMapper, 
    assignmentUseCases,
    assignmentDtoMapper,
    pubsub) => {
    
    return {
        Date: dateScalar,
        Query: {
            course: async (_, { id }) => {
                let course = await courseUseCases.readById(id)

                return courseDtoMapper.map(course)
            },
            courses: async (_, { input }) => {
                console.log(input)
                let courses = await courseUseCases.search(input.keywords, input.start, input.count) 

                return courses.map(courseDtoMapper.map)
            }
        },
        Course: {
            async assignments(course) {
                let assignments = await assignmentUseCases.readAssignmentsByCourseId(course.id)
                
                return assignments.map(assignmentDtoMapper.map)
            }
        },
        Mutation: {
            createCourse: async (_, { course }) => {
                return courseDtoMapper.map(await courseUseCases.create(course))
            },
            updateCourse: async (_, { id, course }) => {
                return courseDtoMapper.map(await courseUseCases.update(id, course))
            },
            deleteCourse: async (_, { id }) => {
                return courseDtoMapper.map(await courseUseCases.delete(id))
            },
            createAssignment: async (_, { courseId, assignment }) => {
                return assignmentDtoMapper.map(await assignmentUseCases.create(courseId, assignment))
            },
            updateAssignment: async (_, { id, assignment }) => {
                return assignmentDtoMapper.map(await assignmentUseCases.update(id, assignment))
            },
            deleteAssignment: async (_, { id }) => {
                return assignmentDtoMapper.map(await assignmentUseCases.delete(id))
            }
        },
        Subscription: {
            courseCreated: {
                subscribe: () => null
            },
            courseUpdated: {
                subscribe: (_, { id }) => pubsub.asyncIterator([`${EventTopics.courseUpdated}:${id}`])
            },
            courseDeleted: {
                subscribe: () => pubsub.asyncIterator([`${EventTopics.courseDeleted}`])
            },
            assignmentCreated: {
                subscribe: (_, { courseId }) => pubsub.asyncIterator([`${EventTopics.assignmentCreated}:${courseId}`])
            },
            assignmentUpdated: {
                subscribe: (_, { id }) => pubsub.asyncIterator([`${EventTopics.assignmentUpdated}:${id}`])
            },
            assignmentDeleted: {
               subscribe: (_, { courseId }) => pubsub.asyncIterator([`${EventTopics.assignmentDeleted}:${courseId}`])
            }
        }
    }
}

export default graphqlResolvers