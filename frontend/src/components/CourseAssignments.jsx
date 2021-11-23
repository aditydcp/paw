import { useEffect, useState } from "react";
import useCourse from "../hooks/use-course";
import useRealtimeCourse from "../hooks/use-realtime-course";
import EditCourseAssignmentModal from "../modals/EditCourseAssignmentModal";
import AssignmentCard from "./AssignmentCard";
import Button from "./Button";
import Card from "./Card";
import Icon from "./Icon";

const CourseAssignments = ({ courseId }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const course = useRealtimeCourse(courseId)

    const openModal = () => {
        setModalOpen(true)
    }

    return (
        <Card>
            {modalOpen ? <EditCourseAssignmentModal courseId={courseId} setModalOpen={setModalOpen} /> : null}
            {(() => {
                if (course) {
                    const { name, code, assignments } = course
                    
                    return (
                        <>
                            <p className="text-lg font-bold">{name}</p>
                            <p className="mb-3 text-gray-500">{code}</p>
                            <div className="mb-3 flex gap-2 justify-end">
                                <div className="flex-grow flex items-center">
                                    <Button>
                                        <Icon iconCode="icon-bell" className="text-white text-xl" />
                                    </Button>                    
                                </div>
                                <Button onClick={openModal}>
                                    <Icon iconCode="icon-pencil" className="text-white text-xl" />
                                </Button>
                                <Button danger>
                                    <Icon iconCode="icon-minus" className="text-white text-xl" />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {assignments.map(id => <AssignmentCard key={id} assignmentId={id} />)}
                            </div>
                        </>
                    )
                } else {
                    return (
                        <p>Loading course details...</p>
                    )
                }
            })()}
        </Card>
    );
}

export default CourseAssignments