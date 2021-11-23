import graphqlFetch from "./graphql-fetch"

const createCourse = async ({ name, code }) => {
    let response = await graphqlFetch(
        `mutation CreateCourse($course: CourseInput!) {
            createCourse(course: $course) {
                id
                code
                name
            }
        }
        `, {
            course: {
                name,
                code
            }
        }
    )

    return response.data.createCourse
}

export default createCourse