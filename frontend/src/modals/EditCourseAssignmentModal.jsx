import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import AssignmentCard from '../components/AssignmentCard'
import EditableAssignmentCard from '../components/EditableAssignmentCard'
import TextInput from '../components/TextInput'
import TextAreaInput from "../components/TextAreaInput"
import Button from '../components/Button'

const EditCourseAssignmentModal = ({ courseId, setCourseId }) => {
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        console.log(courseId)
        setVisible(courseId ? true : false)
    }, [courseId])

    return (
        <Modal
            isOpen={visible}
        >
            <div className="grid grid-cols-4 gap-4 h-full grid-rows-1">
                <div className="col-span-3 flex flex-col h-full">
                    <div className="grid grid-cols-3 gap-4 overflow-y-scroll">
                        <EditableAssignmentCard isEditing={true} />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                        <EditableAssignmentCard />
                    </div>
                    <p className="text-lg font-semibold my-2 ">New assignment</p>
                    <form className="flex flex-col">
                        <label htmlFor="title">Title</label>
                        <TextInput name="title" placeholder="Mengembangkan REST API" />
                        <label htmlFor="title">Deadline</label>
                        <input name="deadline" type="date" className="p-2 rounded w-full border-2 mb-2" placeholder="Deadline" />
                        <label htmlFor="title">Details</label>
                        <TextAreaInput name="details" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ante nec ligula faucibus mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum semper sem quis justo ullamcorper, at ultrices ipsum scelerisque. Praesent egestas ligula eget porta rutrum. Aliquam eget mauris eu neque congue placerat a sed lectus. Fusce quam velit, ullamcorper ut sodales quis, dictum quis felis. Cras sit amet nibh sem. Cras tristique nisi ut mauris malesuada, quis bibendum sem egestas. Fusce vestibulum magna nisi. Integer sit amet lorem ac quam volutpat tincidunt. Vivamus gravida nibh a pellentesque congue. Maecenas orci lacus, dictum molestie magna id, consectetur vulputate dolor." />
                        <Button 
                            className="text-lg text-white self-end"
                        >
                            Add assignment
                        </Button>
                    </form>
                </div>
                <div className="flex flex-col h-full">
                    <form className="mb-4 flex-grow">
                        <TextInput placeholder="Course name" />
                        <TextInput placeholder="Course code" />
                    </form>
                    <Button 
                        onClick={() => setCourseId(null)}
                        className="text-lg text-white self-end"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default EditCourseAssignmentModal