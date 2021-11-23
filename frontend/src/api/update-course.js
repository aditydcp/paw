import graphqlFetch from "./graphql-fetch"

const UpdateCourse = async (courseId, { code, name }) => {
    let response = await graphqlFetch(
        `mutation UpdateCourse($courseId: ID!, $course: CourseInput!) {
            updateCourse(id: $courseId, course: $course) {
              id
            }
          }
        `, {
            course: {
                code,
                name
            },
            courseId
        }
    )

    return response?.data?.updateCourse
}

export default UpdateCourse