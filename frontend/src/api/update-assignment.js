import graphqlFetch from "./graphql-fetch"

const UpdateAssignment = async (assignmentId, { title, deadline, details }) => {
    await graphqlFetch(
        `mutation Mutation($assignmentId: ID!, $assignment: AssignmentInput!) {
            updateAssignment(id: $assignmentId, assignment: $assignment) {
                id
            }
        }
        `, {
            assignmentId,
            assignment: {
                title,
                deadline,
                details
            }
        }
    )
}

export default UpdateAssignment