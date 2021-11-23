import graphqlFetch from "./graphql-fetch"

const DeleteCourse = async (courseId) => {
    await graphqlFetch(
        `mutation DeleteCourse($courseId: ID!) {
            deleteCourse(id: $courseId){
                id
            }
        }
        `, {
            courseId
        }
    )
}

export default DeleteCourse