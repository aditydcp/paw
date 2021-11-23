import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import AssignmentCard from '../components/AssignmentCard'
import EditableAssignmentCard from '../components/EditableAssignmentCard'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import createCourse from '../api/create-course'

const AddCourseModal = ({ visible, setVisible }) => {
    const handleCreateCourse = async (event) => {
        event.preventDefault()

        let { name, code } = event.target

        console.log(name, code)

        let result = await createCourse(name.value, code.value)

        if (result.id) {
            alert ("Course added!")
            setVisible(false)
        }
    }

    return (
        <Modal 
            isOpen={visible}
            closeTimeoutMS={250}
        >
            <div className="flex flex-col h-full">
                <p className="text-lg font-semibold my-2 ">New course</p>
                <form className="mb-4 flex-grow" onSubmit={handleCreateCourse}>
                    <TextInput name="name" placeholder="Course name" />
                    <TextInput name="code" placeholder="Course code" />
                    <Button type="submit"
                        className="mb-2 text-lg text-white self-end"
                    >
                        Add course
                    </Button>
                </form>
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