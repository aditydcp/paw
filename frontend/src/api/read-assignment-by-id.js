import graphqlFetch from "./graphql-fetch"

const readAssignmentById = async (id) => {
    let response = await graphqlFetch(
        `query ReadAssignmentById($id: ID!) {
            assignment(id: $id) {
                id
                title
                details
                deadline
            }
        }
        `, {
            id
        }
    )

    return response.data.assignment
}

export default readAssignmentById