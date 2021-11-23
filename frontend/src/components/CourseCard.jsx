import useCourseCollection from "../hooks/use-course-collection"
import Button from "./Button"
import Icon from "./Icon"

const { default: Card } = require("./Card")

const CourseCard = ({ id, name, code, props }) => {
    const [added, toggle] = useCourseCollection(id)

    return (
        <Card {...props}>
            <div className="flex">
                <div className="flex-grow mr-2">
                    <p className="text-lg font-semibold">{name}</p>
                    <p>{code}</p>
                </div>
                <div className="text-white text-xl flex flex-col gap-2">
                    <Button className="self-end" onClick={toggle} down={added}>
                        {added ? <Icon iconCode="icon-check" /> : <Icon iconCode="icon-plus" />}
                    </Button>
                    <Button className="self-end" danger>
                        <Icon iconCode="icon-trash" className="text-xl" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default CourseCard