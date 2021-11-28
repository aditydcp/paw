import { useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import Subscriptions from "../api/subscriptions"

const useRealtimeCourseList = (initialCourseIds) => {
    const [courseIdsState, setCoursesIdsState] = useState(initialCourseIds)

    const { data: deletedCourseData } = useSubscription(Subscriptions.COURSE_DELETED)

    useEffect(() => {
        if (deletedCourseData?.courseDeleted) {
            setCoursesIdsState(courseIdsState.filter(id => id !== deletedCourseData.courseDeleted.id))
        }
    }, [deletedCourseData])

    return [courseIdsState, setCoursesIdsState]
}

export default useRealtimeCourseList