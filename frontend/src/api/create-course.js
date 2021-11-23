import graphqlFetch from "./graphql-fetch"

const createCourse = async (name, code) => {
    let response = await graphqlFetch(
        `mutation Mutation($course: CourseInput!) {
            createCourse(course: $course) {
                id
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