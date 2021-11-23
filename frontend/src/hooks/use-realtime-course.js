import { useEffect, useReducer } from "react"
import GraphqlWebsocket from "../api/graphql-websocket"
import readCourseById from "../api/read-course-by-id"

const useRealtimeCourse = (courseId) => {
    const listenForCourseUpdate = () => {

    }

    const listenForAssignmentDeleted = (assignmentId) => {
        const subscription = 
            `subscription AssignmentDeleted($assignmentId: ID!) {
                assignmentDeleted(assignmentId: $assignmentId) {
                    id
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
            _ => {
                dispatchAssignments({
                    type: "delete",
                    deletedAssignment: assignmentId
                })
            }
        )
    }

    const listenForAssignmentCreated = () => {
        const subscription = 
            `subscription AssignmentCreated($courseId: ID!) {
                assignmentCreated(courseId: $courseId) {
                    id
                }
            }`

        GraphqlWebsocket.listen(
            `ASSIGNMENT_CREATED:${courseId}`, 
            {
                query: subscription,
                operationName: 'AssignmentCreated',
                variables: {
                    courseId: courseId
                }
            },  
            (payload) => {
                dispatchAssignments({
                    type: "create",
                    newAssignment: payload.data.assignmentCreated.id
                })
            }
        )
    }

    const handleAssignmentDispatch = (oldAssignments, action) => {
        if (action.type === "initialize") {
            listenForAssignmentCreated()

            action.assignments.forEach(id => listenForAssignmentDeleted(id))

            return action.assignments
        } else if (action.type === "create") {
            listenForAssignmentDeleted(action.newAssignment)
            if (!oldAssignments.some(id => id === action.newAssignment)) {
                return [...oldAssignments, action.newAssignment]
            } else {
                return oldAssignments
            }
        } else if (action.type === "delete") {
            return oldAssignments.filter(id => id !== action.deletedAssignment)
        } else {
            return oldAssignments
        }
    }

    const [assignments, dispatchAssignments] = useReducer(handleAssignmentDispatch, [])

    const handleCourseDispatch = (oldCourse, action) => {
        if (action.type === "initialize") {
            const { assignments, ...course } = action.course

            dispatchAssignments({
                type: "initialize",
                assignments: assignments.map(assignment => assignment.id)
            })

            listenForCourseUpdate()
            return course
        } else if (action.type === "update") {
            return action.updatedCourse
        } else {
            return oldCourse
        }
    }

    const [course, dispatchCourse] = useReducer(handleCourseDispatch, null)

    const initialize = async () => {
        let course = await readCourseById(courseId)

        dispatchCourse({
            type: "initialize",
            course
        })
    }

    useEffect(() => {
        initialize()
    }, [])

    return {
        ...course,
        assignments
    }
}

export default useRealtimeCourse