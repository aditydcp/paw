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

                return courseDtoMapper.mapToDetailed(course)
            },
            courses: async (_, { input }) => {
                let courses = await courseUseCases.search(input.keywords, input.start, input.count) 

                return courses.map(courseDtoMapper.mapToDetailed)
            },
            assignment: async (_, { id }) => {
                let assignment = await assignmentUseCases.readById(id)

                return assignmentDtoMapper.map(assignment)
            },
            assignments: async (_, { input }) => {
                let assignments = await assignmentUseCases.search(input.keywords, input.start, input.count)

                return assignments.map(assignmentDtoMapper.map)
            }
        },
        Mutation: {
            createCourse: async (_, { course }) => {
                return courseDtoMapper.mapToDetailed(await courseUseCases.create(course))
            },
            updateCourse: async (_, { id, course }) => {
                return courseDtoMapper.mapToDetailed(await courseUseCases.update(id, course))
            },
            deleteCourse: async (_, { id }) => {
                return courseDtoMapper.mapToDetailed(await courseUseCases.delete(id))
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
            courseUpdated: {
                subscribe: (_, { courseId }) => pubsub.asyncIterator([`${EventTopics.courseUpdated}:${courseId}`])
            },
            courseDeleted: {
                subscribe: (_, { courseId }) => pubsub.asyncIterator([`${EventTopics.courseDeleted}:${courseId}`])
            },
            assignmentCreated: {
                subscribe: (_, { courseId }) => pubsub.asyncIterator([`${EventTopics.assignmentCreated}:${courseId}`])
            },
            assignmentUpdated: {
                subscribe: (_, { assignmentId }) => pubsub.asyncIterator([`${EventTopics.assignmentUpdated}:${assignmentId}`])
            },
            assignmentDeleted: {
               subscribe: (_, { assignmentId }) => pubsub.asyncIterator([`${EventTopics.assignmentDeleted}:${assignmentId}`])
            }
        }
    }
}

export default graphqlResolvers