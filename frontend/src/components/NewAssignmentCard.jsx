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

        let { title, deadline, details } = event.target

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
                            <TextAreaInput name="details" required placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ante nec ligula faucibus mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum semper sem quis justo ullamcorper, at ultrices ipsum scelerisque. Praesent egestas ligula eget porta rutrum. Aliquam eget mauris eu neque congue placerat a sed lectus. Fusce quam velit, ullamcorper ut sodales quis, dictum quis felis. Cras sit amet nibh sem. Cras tristique nisi ut mauris malesuada, quis bibendum sem egestas. Fusce vestibulum magna nisi. Integer sit amet lorem ac quam volutpat tincidunt. Vivamus gravida nibh a pellentesque congue. Maecenas orci lacus, dictum molestie magna id, consectetur vulputate dolor." />
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