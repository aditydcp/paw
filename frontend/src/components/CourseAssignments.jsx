import { useState } from "react";
import EditCourseAssignmentModal from "../modals/EditCourseAssignmentModal";
import AssignmentCard from "./AssignmentCard";
import Button from "./Button";
import Card from "./Card";
import Icon from "./Icon";

const CourseAssignments = ({ courseId }) => {
    const [editId, setEditId] = useState(null)

    const openEditModal = () => {
        setEditId(courseId)
    }

    return (
        <Card>
            <EditCourseAssignmentModal courseId={editId} setCourseId={setEditId} />
            <p className="text-lg font-bold">Pengembangan Aplikasi Web (A)</p>
            <p className="mb-3 text-gray-500">TIF213146</p>
            <div className="mb-3 flex gap-2 justify-end">
                <div className="flex-grow flex items-center">
                    <Button>
                        <Icon iconCode="icon-bell" className="text-white text-xl" />
                    </Button>                    
                </div>
                <Button onClick={openEditModal}>
                    <Icon iconCode="icon-pencil" className="text-white text-xl" />
                </Button>
                <Button danger>
                    <Icon iconCode="icon-trash" className="text-white text-xl" />
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
            </div>
        </Card>
    );
}

export default CourseAssignments