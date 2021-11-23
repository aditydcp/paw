import { useState } from "react"
import CourseCollection from "../api/course-collection"

const useCourseCollection = (courseId) => {
    const [added, setAdded] = useState(CourseCollection.exists(courseId))

    const toggle = () => {
        if (added) {
            CourseCollection.remove(courseId)
            setAdded(false)
        } else {
            CourseCollection.add(courseId)
            setAdded(true)
        }
    }

    return [added, toggle]
}

export default useCourseCollection