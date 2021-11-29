import { useEffect, useState } from "react"
import SavedCourseCollection from "../api/saved-course-collection"

const useSavedCourse = (courseId) => {
    const [savedState, setSavedState] = useState(false)

    const updateState = () => setSavedState(SavedCourseCollection.exists(courseId))

    useEffect(() => {
        window.addEventListener('storage', updateState)

        updateState()

        return (() => {
            window.removeEventListener('storage', updateState)
        })
    }, [])
    
    
    const save = () => {
        SavedCourseCollection.add(courseId)
    }

    const unsave = () => {
        SavedCourseCollection.remove(courseId)
    }

    const toggle = () => {
        if (SavedCourseCollection.exists(courseId)) {
            SavedCourseCollection.remove(courseId)
        } else {
            SavedCourseCollection.add(courseId)
        }
    }

    return { save, unsave, toggle, isSaved: savedState }
}

export default useSavedCourse