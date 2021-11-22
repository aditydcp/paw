import Button from "./Button"
import Icon from "./Icon"
import TextAreaInput from "./TextAreaInput"
import TextInput from "./TextInput"

const EditableAssignmentCard = ({ isEditing, ...props }) => {
    return (
        <span className="p-6 border-2 rounded-md bg-white" {...props}>
            {(() => {
                if (isEditing) {
                    return (
                        <form className="flex flex-col">
                            <label htmlFor="title">Title</label>
                            <TextInput name="title" placeholder="Mengembangkan REST API" />
                            <label htmlFor="title">Deadline</label>
                            <input name="deadline" type="date" className="p-2 rounded w-full border-2 mb-2" placeholder="Deadline" />
                            <label htmlFor="title">Details</label>
                            <TextAreaInput name="details" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ante nec ligula faucibus mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum semper sem quis justo ullamcorper, at ultrices ipsum scelerisque. Praesent egestas ligula eget porta rutrum. Aliquam eget mauris eu neque congue placerat a sed lectus. Fusce quam velit, ullamcorper ut sodales quis, dictum quis felis. Cras sit amet nibh sem. Cras tristique nisi ut mauris malesuada, quis bibendum sem egestas. Fusce vestibulum magna nisi. Integer sit amet lorem ac quam volutpat tincidunt. Vivamus gravida nibh a pellentesque congue. Maecenas orci lacus, dictum molestie magna id, consectetur vulputate dolor." />
                            <div className="flex-grow"></div>
                            <Button 
                                className="text-lg text-white self-end"
                            >
                                <Icon iconCode="icon-check" className="inline"/> Confirm
                            </Button>
                        </form>
                    )
                } else {
                    return (
                        <div className="flex flex-col h-full">
                            <p className="font-bold">Mengembangkan REST API</p>
                            <p className="mb-4">Due 23 Dec 2023</p>
                            <p className="mb-4 flex-grow">Dengan kelompok yang telah disusun sebelumnya, buat 2 fungsi CRUD. Buat repositori github dengan pola nama repositori paw-kelompok-1. Nama branch yang dikumpulkan bernama tugas-2.</p>
                            <div className="flex justify-end gap-2">
                                <Button className="text-white text-lg">
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
        </span>
    )
}

export default EditableAssignmentCard