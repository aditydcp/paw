import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Queries from "../api/queries";
import useCourse from "../hooks/use-course";
import useCourseCollection from "../hooks/use-course-collection";
import useRealtimeCourse from "../hooks/use-realtime-course";
import EditCourseAssignmentModal from "../modals/EditCourseAssignmentModal";
import AssignmentCard from "./AssignmentCard";
import Button from "./Button";
import Card from "./Card";
import Icon from "./Icon";

const CourseAssignments = ({ courseId }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [course, assignments, loading] = useRealtimeCourse(courseId)
    const added = true
    const toggle = () => {}

    const openModal = () => {
        setModalOpen(true)
    }

    if (added) {
        return (
            <Card>
                {modalOpen ? <EditCourseAssignmentModal courseId={courseId} setModalOpen={setModalOpen} /> : null}
                {(() => {
                    if (!loading && course && assignments) {
                        return (
                            <>
                                <p className="text-lg font-bold">{course.name}</p>
                                <p className="mb-3 text-gray-500">{course.code}</p>
                                <div className="mb-3 flex gap-2 justify-end">
                                    <div className="flex-grow flex items-center"></div>
                                    <Button onClick={openModal}>
                                        <Icon iconCode="icon-pencil" className="text-white text-xl" />
                                    </Button>
                                    <Button danger onClick={toggle}>
                                        <Icon iconCode="icon-minus" className="text-white text-xl" />
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {assignments.map(assignment => <AssignmentCard key={assignment.id} initialAssignment={assignment} />)}
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
    } else {
        return null
    }
}

export default CourseAssignments