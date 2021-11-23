import { useEffect, useReducer } from "react"
import GraphqlWebsocket from "../api/graphql-websocket"
import readAssignmentById from "../api/read-assignment-by-id"

const useRealtimeAssignment = (assignmentId) => {
    const listenForUpdates = () => {
        const subscription = 
            `subscription AssignmentUpdated($assignmentId: ID!) {
                assignmentUpdated(assignmentId: $assignmentId) {
                    title
                    details
                    deadline
                }
            }`
        
        GraphqlWebsocket.listen(
            `ASSIGNMENT_UPDATE:${assignmentId}`,
            {
                query: subscription,
                operationName: 'AssignmentUpdated',
                variables: {
                    assignmentId: assignmentId
                }
            },
            (payload) => {
                dispatch({
                    type: "update",
                    updatedAssignment: payload.data.assignmentUpdated
                })
            }
        )
    }

    const onAssignmentDispatch = (oldAssignment, { type, updatedAssignment }) => {
        if (type === "initialize") {
            listenForUpdates()
            return updatedAssignment
        } else if (type === "update") {
            return updatedAssignment
        } else {
            return oldAssignment
        }
    }

    const [assignment, dispatch] = useReducer(onAssignmentDispatch, null)

    const initialize = async () => {
        console.log(assignmentId)
        let updatedAssignment = await readAssignmentById(assignmentId)

        dispatch({
            type: "initialize",
            updatedAssignment
        })
    }

    useEffect(() => {
        initialize()
    }, [])

    return assignment
}

export default useRealtimeAssignment