import graphqlFetch from "./graphql-fetch"

const readCourseById = async (id) => {
    let response = await graphqlFetch(
        `query ReadCourseById($id: ID!) {
            course(id: $id) {
                id
                code
                name
                assignments {
                    id
                    title
                    details
                    deadline
                }
            }
        }
        `, {
            id
        }
    )

    return response.data.course
}

export default readCourseById