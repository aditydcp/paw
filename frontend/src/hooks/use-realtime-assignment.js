import { useSubscription } from "@apollo/client"
import { useEffect, useReducer, useState } from "react"
import Subscriptions from "../api/subscriptions"

const useRealtimeAssignment = ({ id, ...assignment }) => {
    const [assignmentState, setAssignmentState] = useState({
        id,
        ...assignment
    })

    const { data, loading } = useSubscription(Subscriptions.ASSIGNMENT_UPDATED, {
        variables: {
            assignmentId: id
        }
    })

    useEffect(() => {
        if (data?.assignmentUpdated) {
            setAssignmentState(data?.assignmentUpdated)
        }
    }, [data])

    return [
        assignmentState,
        loading
    ]
}

export default useRealtimeAssignment