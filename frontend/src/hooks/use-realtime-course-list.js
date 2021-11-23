import { useEffect, useReducer } from "react"
import CourseCollection from "../api/course-collection"
import GraphqlWebsocket from "../api/graphql-websocket"

const useRealtimeCourseList = () => {
    const listenForCourseDeleted = (courseId) => {
        const subscription = 
            `subscription CourseDeleted($courseId: ID!) {
                courseDeleted(courseId: $courseId) {
                    id
                }
            }`

        GraphqlWebsocket.listen(
            `COURSE_DELETED:${courseId}`, 
            {
                query: subscription,
                operationName: 'CourseDeleted',
                variables: {
                    courseId
                }
            },  
            (payload) => {
                dispatchCourses({
                    type: "delete",
                    deletedCourseId: payload.data.courseDeleted.id
                })
            }
        )
    }

    const handleCoursesDispatch = (oldCourses, action) => {
        if (action.type === "override") {
            action.courses.forEach(id => listenForCourseDeleted(id))
            return action.courses
        } else if (action.type === "delete") {
            return oldCourses.filter(id => id !== action.deletedCourseId)
        } else {
            return oldCourses
        }
    }

    const [courses, dispatchCourses] = useReducer(handleCoursesDispatch, [])

    const setCourses = (courses) => {
        dispatchCourses({
            type: "override",
            courses
        })
    }

    return [courses, setCourses]
}

export default useRealtimeCourseList