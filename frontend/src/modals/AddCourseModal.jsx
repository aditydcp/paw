import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import AssignmentCard from '../components/AssignmentCard'
import EditableAssignmentCard from '../components/EditableAssignmentCard'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const AddCourseModal = ({ visible, setVisible }) => {

    return (
        <Modal 
            isOpen={visible}
            closeTimeoutMS={250}
        >
            <div className="flex flex-col h-full">
                <p className="text-lg font-semibold my-2 ">New course</p>
                <form className="mb-4 flex-grow">
                    <TextInput name="name" placeholder="Course name" />
                    <TextInput name="code" placeholder="Course code" />
                </form>
                <Button 
                    className="mb-2 text-lg text-white self-end"
                >
                    Add course
                </Button>
                <Button 
                    onClick={() => setVisible(false)}
                    className="text-lg text-white self-end"
                >
                    Close
                </Button>
            </div>
        </Modal>
    )
}

export default AddCourseModal