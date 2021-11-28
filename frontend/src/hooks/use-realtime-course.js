import { useQuery, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import Queries from "../api/queries"
import Subscriptions from "../api/subscriptions"

const useRealtimeCourse = (id) => {
    const { loading, data: courseData } = useQuery(Queries.READ_COURSE_BY_ID, {
        variables: {
            id
        },
        fetchPolicy: 'no-cache'
    })

    const [course, setCourse] = useState(null)
    const [assignments, setAssignments] = useState([])

    const { data: updatedCourseData } = useSubscription(Subscriptions.COURSE_UPDATED, {
        variables: {
            id
        }
    })

    const { data: newAssignmentData } = useSubscription(Subscriptions.ASSIGNMENT_CREATED, {
        variables: {
            courseId: id
        }
    })

    const { data: deletedAssignmentData } = useSubscription(Subscriptions.ASSIGNMENT_DELETED, {
        variables: {
            courseId: id
        }
    })

    useEffect(() => {
        if (courseData) {
            const { assignments, ...course } = courseData.course

            setCourse(course)
            setAssignments(assignments)
        }
    }, [courseData])

    useEffect(() => {
        if (updatedCourseData?.courseUpdated) {
            setCourse(updatedCourseData.courseUpdated)
        }
    }, [updatedCourseData])

    useEffect(() => {
        if (newAssignmentData?.assignmentCreated) {
            setAssignments([...assignments, newAssignmentData.assignmentCreated])
        }
    }, [newAssignmentData])

    useEffect(() => {
        if (deletedAssignmentData?.assignmentDeleted) {
            setAssignments(assignments.filter(assignment => assignment.id !== deletedAssignmentData.assignmentDeleted.id))
        }
    }, [deletedAssignmentData])

    return [course, assignments, loading]
}

export default useRealtimeCourse