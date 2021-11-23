import { useState } from "react"
import createAssignment from "../api/create-assignment"
import Button from "./Button"
import Card from "./Card"
import FlatCard from "./FlatCard"
import Icon from "./Icon"
import TextAreaInput from "./TextAreaInput"
import TextInput from "./TextInput"

const NewAssignmentCard = ({ courseId }) => {
    const [isAdding, setIsAdding] = useState(false)

    const toggle = () => {
        setIsAdding(!isAdding)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const { title, deadline, details } = event.target

        await createAssignment(courseId, {
            title: title.value,
            deadline: new Date(deadline.value).toISOString(),
            details: details.value
        })

        toggle()
    }

    return (
        <FlatCard>
            {(() => {
                if (isAdding) {
                    return (
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <TextInput name="title" required placeholder="Mengembangkan REST API" />
                            <label htmlFor="title">Deadline</label>
                            <input name="deadline" type="date"  required className="p-2 rounded w-full border-2 mb-2" placeholder="Deadline" />
                            <label htmlFor="title">Details</label>
                            <TextAreaInput name="details" required placeholder="Membuat REST API dengan ide yang harus berbeda dari kelompok lain menggunakan MERN." />
                            <div className="flex gap-2 justify-end">
                                <Button 
                                    className="text-lg text-white self-end"
                                >
                                    Add
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
                        <button className="w-full h-full flex flex-col items-center justify-center"
                            onClick={toggle}
                        >
                            <Icon iconCode="icon-plus" className="text-8xl text-gray-300 mb-4" />
                            <p className="text-xl">New assignment</p>
                        </button>
                    )
                }
            })()}
        </FlatCard>
    )
}

export default NewAssignmentCard
