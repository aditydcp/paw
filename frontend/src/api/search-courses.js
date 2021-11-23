import graphqlFetch from "./graphql-fetch"

const searchCourses = async (keywords, start, count) => {
    let response = await graphqlFetch(
        `query ReadAllCourses($query: CoursesQueryInput) {
            courses(input: $query) {
              id
              name
              code
            }
          }
        `, {
            query: {
                keywords,
                start,
                count
            }
        }
    )

    return response.data.courses
}

export default searchCourses