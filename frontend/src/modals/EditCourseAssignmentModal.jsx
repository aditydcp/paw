import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import AssignmentCard from '../components/AssignmentCard'
import EditableAssignmentCard from '../components/EditableAssignmentCard'
import TextInput from '../components/TextInput'
import TextAreaInput from "../components/TextAreaInput"
import Button from '../components/Button'
import NewAssignmentCard from '../components/NewAssignmentCard'
import useCourse from '../hooks/use-course'
import useRealTimeCourse from "../hooks/use-realtime-course"

const EditCourseAssignmentModal = ({ courseId, setModalOpen }) => {
    const course = useRealTimeCourse(courseId)
    
    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <Modal
            isOpen={true}
        >
            {(() => {
                if (course) {
                    const { name, code, assignments } = course

                    return (
                        <>
                            <div className="grid grid-cols-4 gap-4 h-full grid-rows-1">
                                <div className="col-span-3 flex flex-col h-full">
                                    <div className="grid grid-cols-3 gap-4 overflow-y-scroll">
                                        <NewAssignmentCard courseId={courseId} />
                                        {assignments.map(id => <EditableAssignmentCard key={id} assignmentId={id} />)}
                                    </div>
                                </div>
                                <div className="flex flex-col h-full">
                                    <form className="mb-4 flex-grow">
                                        <TextInput placeholder="Course name" defaultValue={name} />
                                        <TextInput placeholder="Course code" defaultValue={code} />
                                    </form>
                                    <Button 
                                        onClick={closeModal}
                                        className="text-lg text-white self-end"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </>
                    )
                } else {
                    <p>Loading course details...</p>
                }
            })()}
        </Modal>
    )
}

export default EditCourseAssignmentModal