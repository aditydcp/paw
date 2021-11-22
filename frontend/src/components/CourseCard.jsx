import CourseCollection from "../api/course-collection"
import useCourseCollection from "../hooks/use-course-collection"
import Button from "./Button"

const { default: Card } = require("./Card")

const CourseCard = ({ id, name, code }) => {
    const [added, toggle] = useCourseCollection(id)

    return (
        <Card>
            <div className="flex flex-col">
                <p className="text-lg font-bold">{name}</p>
                <p className="mb-6">{code}</p>
                <div className="flex items-center">
                    <p className="flex-grow">42 assignments</p>
                    <Button className="self-end" onClick={toggle}>
                        {added ? "Added" : "Add"}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default CourseCard