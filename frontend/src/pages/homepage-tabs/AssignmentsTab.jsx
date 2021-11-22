import CourseAssignments from "../../components/CourseAssignments"
import Button from "../../components/Button"

const AssignmentsTab = () => {
    return (
        <div className="m-8">
            <h1 className="text-3xl mb-6">
                <i className="icon-notebook text-purple-700"></i> Assignments
            </h1>
            <div className="grid grid-cols-4 gap-6">
                <CourseAssignments />
                <CourseAssignments />
                <CourseAssignments />
                <CourseAssignments />
                <CourseAssignments />
                <CourseAssignments />
            </div>
        </div>
    )
}

export default AssignmentsTab