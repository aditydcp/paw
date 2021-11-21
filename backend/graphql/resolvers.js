const GraphqlResolver = (courseUseCases, assignmentUseCases) => {
    return {
        Query: {
            course: async (_, { id }) => {
                
            },
            courses: async (_, { keywords, start, count }) => {

            },
            assignment: async (_, { id }) => {
                return await assignmentUseCases.readById(id)
            },
            assignmentsByCourse: async (_, { courseId }) => {
                let course = await courseUseCases.readById(courseId)

                return course.assignments
            },
            assignments: async (_, { keywords, start, count }) => {
                return await assignmentUseCases.search(keywords, start, count)
            }
        },
        Mutation: {
            createCourse: async () => {
                return await assignme
            },
            updateCourse: async () => {
    
            },
            deleteCourse: async () => {
    
            },
            createAssignment: async () => {
                
            },
            updateAssignment: async () => {
    
            },
            deleteAssignment: async () => {
    
            }
        },
        Subscription: {
            assignmentCreated: {
            subscribe: () => {}
            },
            assignmentUpdated: {
            subscribe: () => {}
            },
            assignmentDeleted: {
            subscribe: () => {}
            }
        }
    }
}

export default Resolvers