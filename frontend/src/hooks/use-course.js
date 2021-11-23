import { useEffect, useReducer, useState } from "react"
import GraphqlWebsocket from "../api/graphql-websocket"
import readCourseById from "../api/read-course-by-id"

const useCourse = (id) => {
    const listenForAssignmentDelete = (assignmentId) => {
        const subscription = 
            `subscription AssignmentDeleted($assignmentId: ID!) {
                assignmentDeleted(assignmentId: $assignmentId) {
                    id
                    title
                }
            }`

        GraphqlWebsocket.listen(
            `ASSIGNMENT_DELETE:${assignmentId}`,
            {
                query: subscription,
                operationName: 'AssignmentDeleted',
                variables: {
                    assignmentId
                }
            },
            (payload) => {
                dispatch({
                    type: "remove",
                    assignmentId
                })
            }
        )
    }

    const [course, setCourse] = useState(null)
    const [assignments, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "update":
                action.assignments.forEach(assignment => {
                    listenForAssignmentDelete(assignment.id)
                })

                return action.assignments
            case "push":
                if (!state.some(assignment => assignment.id === action.newAssignment.id)) {
                    listenForAssignmentDelete(action.newAssignment.id)
                    return [...state, action.newAssignment]
                } else {
                    return state
                }
            case "remove":
                return state.filter(assignment => assignment.id !== action.assignmentId)
            default:
                throw new Error("Invalid action type.")
        }
    }, [])

    const loadCourse = async () => {
        let fetchedCourse = await readCourseById(id)
        
        setCourse(fetchedCourse)

        dispatch({
            type: "update",
            assignments: fetchedCourse.assignments
        })

        listenForAssignmentChange()
    }

    const listenForAssignmentChange = () => {
        const subscription = 
            `subscription AssignmentCreated($courseId: ID!) {
                assignmentCreated(courseId: $courseId) {
                    id
                    title
                    details
                    deadline  
                }
            }`

        GraphqlWebsocket.listen(
            `COURSE_ADD_ASSIGNMENT:${id}`, 
            {
                query: subscription,
                operationName: 'AssignmentCreated',
                variables: {
                    courseId: id
                }
            },  
            (payload) => {
                dispatch({
                    type: "push",
                    newAssignment: payload.data.assignmentCreated
                })
            }
        )
    }

    useEffect(() => {
        loadCourse()
    }, [])

    return {
        ...course,
        assignments
    }
}

export default useCourse