import graphqlFetch from "./graphql-fetch"

const DeleteAssignment = async (assignmentId) => {
    await graphqlFetch(
        `mutation DeleteAssignment($assignmentId: ID!) {
                deleteAssignment(id: $assignmentId) {
                    id
                }
            }
        `, {
            assignmentId
        }
    )
}

export default DeleteAssignment