import gql from "graphql-tag";

const Queries = {
    SEARCH_COURSES: gql`
        query ReadAllCourses($query: CoursesQueryInput) {
            courses(input: $query) {
                id
                name
                code
            }
        }
    `,
    READ_COURSE_BY_ID: gql`
        query ReadCourseById($id: ID!) {
            course(id: $id) {
                id
                code
                name,
                assignments {
                    id
                    title
                    details
                    deadline
                }
            }
        }
    `
}

export default Queries