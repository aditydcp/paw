import { useState } from "react"
import Button from "./Button"
import FlatCard from "./FlatCard"
import Icon from "./Icon"
import TextAreaInput from "./TextAreaInput"
import TextInput from "./TextInput"

const EditableAssignmentCard = ({ assignment, ...props }) => {
    const [isEditing, setIsEditing] = useState(false)

    const { title, deadline, details } = assignment

    const toggle = () => {
        setIsEditing(!isEditing)
    }

    return (
        <FlatCard>
            {(() => {
                if (isEditing) {
                    return (
                        <form className="flex flex-col">
                            <label htmlFor="title">Title</label>
                            <TextInput name="title" placeholder="Mengembangkan REST API" defaultValue={title} />
                            <label htmlFor="title">Deadline</label>
                            <input name="deadline" type="date" className="p-2 rounded w-full border-2 mb-2" placeholder="Deadline" defaultValue={deadline} />
                            <label htmlFor="title">Details</label>
                            <TextAreaInput name="details" defaultValue={details} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ante nec ligula faucibus mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum semper sem quis justo ullamcorper, at ultrices ipsum scelerisque. Praesent egestas ligula eget porta rutrum. Aliquam eget mauris eu neque congue placerat a sed lectus. Fusce quam velit, ullamcorper ut sodales quis, dictum quis felis. Cras sit amet nibh sem. Cras tristique nisi ut mauris malesuada, quis bibendum sem egestas. Fusce vestibulum magna nisi. Integer sit amet lorem ac quam volutpat tincidunt. Vivamus gravida nibh a pellentesque congue. Maecenas orci lacus, dictum molestie magna id, consectetur vulputate dolor." />
                            <div className="flex-grow"></div>
                            <div className="flex gap-2 justify-end">
                                <Button 
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
                                <Button danger className="text-white text-lg">
                                    <Icon iconCode="icon-trash" className="inline"/> Delete
                                </Button>
                            </div>
                        </div>
                    )
                }
            })()}
        </FlatCard>
    )
}

export default EditableAssignmentCard