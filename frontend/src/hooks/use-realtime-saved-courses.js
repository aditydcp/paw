import { useEffect, useReducer } from "react"
import CourseCollection from "../api/course-collection"
import GraphqlWebsocket from "../api/graphql-websocket"
import readCourseById from "../api/read-course-by-id"

const useRealtimeSavedCourses = () => {
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
                console.log(payload)
                dispatchCourses({
                    type: "delete",
                    deletedCourseId: payload.data.courseDeleted.id
                })
            }
        )
    }

    const handleCoursesDispatch = (oldCourses, action) => {
        if (action.type === "initialize") {
            action.courses.forEach(course => listenForCourseDeleted(course))

            return action.courses
        } else if (action.type === "save") {

        } else if (action.type === "unsave") {

        } else if (action.type === "delete") {
            console.log(oldCourses)
            console.log(action.deletedCourseId)
            return oldCourses.filter(id => id !== action.deletedCourseId)
        } else {
            return oldCourses
        }
    }

    const [courses, dispatchCourses] = useReducer(handleCoursesDispatch, [])

    const initialize = async () => {
        let courses = CourseCollection.get()

        const promises = courses.map(async (course) => {
            let response = await readCourseById(course)
                
            if (response) {
                return course
            } else {
                CourseCollection.remove(course)
            }
        })

        courses = await Promise.all(promises)

        dispatchCourses({
            type: "initialize",
            courses
        })
    }

    const unsave = (courseId) => {

    }

    const save = (courseId) => {

    }

    useEffect(() => {
        initialize()
    }, [])

    return [courses, save, unsave]
}

export default useRealtimeSavedCourses