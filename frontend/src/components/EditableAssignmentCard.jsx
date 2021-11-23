import { useState } from "react"
import DeleteAssignment from "../api/delete-assignment"
import UpdateAssignment from "../api/update-assignment"
import useRealtimeAssignment from "../hooks/use-realtime-assignment"
import Button from "./Button"
import FlatCard from "./FlatCard"
import Icon from "./Icon"
import TextAreaInput from "./TextAreaInput"
import TextInput from "./TextInput"

const EditableAssignmentCard = ({ assignmentId, ...props }) => {
    const [isEditing, setIsEditing] = useState(false)

    const assignment = useRealtimeAssignment(assignmentId)

    const toggle = () => {
        setIsEditing(!isEditing)
    }

    const handleUpdate = async (event) => {
        event.preventDefault()

        const { title, deadline, details } = event.target

        await UpdateAssignment(assignment.id, {
            title: title.value,
            deadline: new Date(deadline.value).toISOString(),
            details: details.value
        })

        toggle()
    }

    const handleDelete = async () => {
        await DeleteAssignment(assignment.id)
    }

    return (
        <FlatCard>
            {(() => {
                if (assignment) {

                    const { title, deadline, details } = assignment

                    if (isEditing) {
                        return (
                            <form className="flex flex-col" onSubmit={handleUpdate}>
                                <label htmlFor="title">Title</label>
                                <TextInput name="title" required placeholder="Mengembangkan REST API" defaultValue={title} />
                                <label htmlFor="title">Deadline</label>
                                <input name="deadline" required type="date" className="p-2 rounded w-full border-2 mb-2" placeholder="Deadline" defaultValue={deadline} />
                                <label htmlFor="title">Details</label>
                                <TextAreaInput name="details" required defaultValue={details} placeholder="Membuat REST API dengan ide yang harus berbeda dari kelompok lain menggunakan MERN." />
                                <div className="flex-grow"></div>
                                <div className="flex gap-2 justify-end">
                                    <Button type="submit"
                                        className="text-lg text-white self-end"
                                    >
                                        <Icon iconCode="icon-check" className="inline"/> Confirm
                                    </Button>
                                    <Button danger onClick={toggle}
                                        className="text-lg text-white self-end"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )
                    } else {
                        return (
                            <div className="flex flex-col h-full">
                                <p className="font-bold">{title}</p>
                                <p className="mb-4">{deadline}</p>
                                <p className="mb-4 flex-grow">{details}</p>
                                <div className="flex justify-end gap-2">
                                    <Button className="text-white text-lg" onClick={toggle}>
                                        <Icon iconCode="icon-pencil" className="inline"/> Edit
                                    </Button>
                                    <Button danger className="text-white text-lg" onClick={handleDelete}>
                                        <Icon iconCode="icon-trash" className="inline"/> Delete
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                } else {
                    return (
                        <p>Loading assignment details...</p>
                    )    
                }
            })()}
        </FlatCard>
    )
}

export default EditableAssignmentCard
