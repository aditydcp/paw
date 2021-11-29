import gql from "graphql-tag";

const Subscriptions = {
    COURSE_UPDATED: gql`
        subscription CourseUpdated($id: ID!) {
            courseUpdated(id: $id) {
                id
                code
                name
            }
        }
    `,
    COURSE_DELETED: gql`
        subscription CourseDeleted {
            courseDeleted {
                id
            }
        }
    `,
    ASSIGNMENT_CREATED: gql`
        subscription AssignmentCreated($courseId: ID!) {
            assignmentCreated(courseId: $courseId) {
                id
                title
                details
                deadline
            }
        }
    `,
    ASSIGNMENT_UPDATED: gql`
        subscription AssignmentUpdated($assignmentId: ID!) {
            assignmentUpdated(id: $assignmentId) {
                id
                title
                details
                deadline
            }
        }
    `,
    ASSIGNMENT_DELETED: gql`
        subscription AssignmentDeleted($courseId: ID!) {
            assignmentDeleted(courseId: $courseId) {
                id
            }
        }
    `
}

export default Subscriptions