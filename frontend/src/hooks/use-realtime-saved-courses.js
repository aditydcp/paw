import { useEffect, useReducer, useState } from "react"
import SavedCourseCollection from "../api/saved-course-collection"
import GraphqlWebsocket from "../api/graphql-websocket"
import readCourseById from "../api/read-course-by-id"
import useRealtimeCourseList from "./use-realtime-course-list"
import { useSubscription } from "@apollo/client"
import Subscriptions from "../api/subscriptions"

const useRealtimeSavedCourses = () => {
    const [savedCoursesState, setSavedCoursesState] = useState([])  

    const { data: deletedCourseData } = useSubscription(Subscriptions.COURSE_DELETED)

    useEffect(() => {
        if (deletedCourseData?.courseDeleted) {
            SavedCourseCollection.remove(deletedCourseData.courseDeleted.id)
        }
    }, [deletedCourseData])

    const courseExists = async (id) => {
        let response = await readCourseById(id)

        return (response ? true : false)
    }

    const syncLocalStorageWithServer = async () => {
        let storedCourses = SavedCourseCollection.get()

        let courseExistences = await Promise.all(storedCourses.map(courseExists))

        SavedCourseCollection.set(storedCourses.filter((courseId, index) => courseExistences[index]))
    }

    const updateState = () => setSavedCoursesState(SavedCourseCollection.get())

    useEffect(() => {
        window.addEventListener('storage', updateState)

        syncLocalStorageWithServer()

        return (() => {
            window.removeEventListener('storage', updateState)
        })
    }, [])

    return [savedCoursesState]
}

export default useRealtimeSavedCourses