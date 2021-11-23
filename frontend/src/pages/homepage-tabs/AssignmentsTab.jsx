import CourseAssignments from "../../components/CourseAssignments"
import Button from "../../components/Button"
import { useEffect, useState } from "react"
import CourseCollection from "../../api/course-collection"
import readCourseById from "../../api/read-course-by-id"
import useRealtimeSavedCourses from "../../hooks/use-realtime-saved-courses"

const AssignmentsTab = () => {
    const [courses, save, unsave] = useRealtimeSavedCourses()

    return (
        <div className="m-8">
            <h1 className="text-3xl mb-6">
                <i className="icon-notebook text-purple-700"></i> Assignments
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(courseId => <CourseAssignments key={courseId} courseId={courseId} />)}
            </div>
        </div>
    )
}

export default AssignmentsTab