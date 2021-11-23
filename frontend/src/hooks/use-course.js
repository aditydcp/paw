import { useEffect, useReducer, useState } from "react"
import readCourseById from "../api/read-course-by-id"

const socket = new WebSocket(`ws://localhost:4000/graphql`, ['graphql-ws'])

let websocketConnected = false
const pendingQueue = []

socket.addEventListener("open", event => {
    socket.send(`{"type":"connection_init","payload":{"content-type":"application/json"}}`)

    websocketConnected = true

    console.log("Sending pending queue...")
    pendingQueue.forEach(message => {
        socket.send(message)
    })
})

socket.addEventListener("close", event => {
    console.log("Websocket closed.")
})

const subscriptionCallbacks = {}

socket.addEventListener("message", event => {
    let { type, id, payload } = JSON.parse(event.data)
    if (type === "data") {
        let callbacks = subscriptionCallbacks[id]

        callbacks.forEach(callback => {
            callback(payload)
        })
    }
})

const GraphqlWebsocket = {
    listen(operationId, payload, callback) {
        if (!subscriptionCallbacks[operationId]) {
            subscriptionCallbacks[operationId] = [callback]

            let message = JSON.stringify({
                id: operationId,
                type: "start",
                payload
            })

            if (!websocketConnected) {
                pendingQueue.push(message)
            } else {
                socket.send(message)
            }

        }
        
        subscriptionCallbacks[operationId].push(callback)
    }
}

const useCourse = (id) => {
    const [course, setCourse] = useState(null)
    const [assignments, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "update":
                return action.assignments
            case "push":
                if (!state.some(assignment => assignment.id === action.newAssignment.id)) {
                    return [...state, action.newAssignment]
                } else {
                    return state
                }
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
            })
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