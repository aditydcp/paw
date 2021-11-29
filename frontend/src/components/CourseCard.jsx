import Button from "./Button"
import Icon from "./Icon"
import DeleteCourse from "../api/delete-course"
import useRealtimeCourse from "../hooks/use-realtime-course"
import { useContext } from "react"
import SavedCoursesContext from "../context/saved-courses-context"
import useSavedCourse from "../hooks/use-saved-course"

const { default: Card } = require("./Card")

const CourseCard = ({ courseId, ...props }) => {
    const savedCoursesContext = useContext(SavedCoursesContext)
    const { isSaved, toggle } = useSavedCourse(courseId)
    const [course] = useRealtimeCourse(courseId)

    const handleDelete = async () => {
        await DeleteCourse(courseId)
    }

    return (
        <Card {...props}>
            {course
                ?   <>
                        <div className="flex">
                            <div className="flex-grow mr-2">
                                <p className="text-lg font-semibold">{course.name}</p>
                                <p>{course.code}</p>
                            </div>
                            <div className="text-white text-xl flex flex-col gap-2">
                                <Button className="self-end" onClick={toggle} down={isSaved}>
                                    {isSaved ? <Icon iconCode="icon-check" /> : <Icon iconCode="icon-plus" />}
                                </Button>
                                <Button className="self-end" danger onClick={handleDelete}>
                                    <Icon iconCode="icon-trash" className="text-xl" />
                                </Button>
                            </div>
                        </div>
                    </>
                :   <p>Loading course details...</p>
            }
        </Card>
    )
}

export default CourseCard