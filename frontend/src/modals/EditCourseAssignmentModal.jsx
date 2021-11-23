import { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import AssignmentCard from '../components/AssignmentCard'
import EditableAssignmentCard from '../components/EditableAssignmentCard'
import TextInput from '../components/TextInput'
import TextAreaInput from "../components/TextAreaInput"
import Button from '../components/Button'
import NewAssignmentCard from '../components/NewAssignmentCard'
import useCourse from '../hooks/use-course'
import useRealTimeCourse from "../hooks/use-realtime-course"
import UpdateCourse from '../api/update-course'

const EditCourseAssignmentModal = ({ courseId, setModalOpen }) => {
    const course = useRealTimeCourse(courseId)

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleUpdateCourse = async (event) => {
        event.preventDefault()

        let { name, code } = event.target

        let response = await UpdateCourse(courseId, {
            name: name.value,
            code: code.value
        })

        if (!response?.id) {
            alert("Error updating course.")
        } else {
            alert("Update saved!")
        }
    }

    return (
        <Modal
            isOpen={true}
            closeTimeoutMS={250}
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
                                    <form method="POST" className="mb-4 flex-grow" onSubmit={handleUpdateCourse}>
                                        <TextInput name="name" placeholder="Course name" defaultValue={name} />
                                        <TextInput name="code" placeholder="Course code" defaultValue={code} />
                                        <Button type="submit"
                                            className="text-lg text-white self-end"
                                        >
                                            Update code & name
                                        </Button>
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