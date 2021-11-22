import AssignmentCard from "./AssignmentCard";
import Button from "./Button";
import Card from "./Card";

const CourseAssignments = () => {
    return (
        <Card>
            <p className="text-lg font-bold">Pengembangan Aplikasi Web (A)</p>
            <p className="mb-3 text-gray-500">TIF213146</p>
            <div className="mb-3 flex gap-2 justify-end">
                <div className="flex-grow flex items-center">
                    <button className="underline">Details</button>
                </div>
                <Button>        
                    <p className="icon-pencil text-xl text-white"></p>
                </Button>
                <Button danger>
                    <p className="icon-trash text-xl text-white"></p>
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