import graphqlFetch from "./graphql-fetch"

const createAssignment = async (courseId, { title, deadline, details }) => {
    let response = await graphqlFetch(
        `mutation CreateAssignment($courseId: ID!, $assignment: AssignmentInput!) {
            createAssignment(courseId: $courseId, assignment: $assignment) {
                id
                title
                details
                deadline
            }
        }
        `, {
            courseId,
            assignment: {
                title,
                deadline,
                details
            }
        }
    )

    return response.data.createAssignment
}

export default createAssignment