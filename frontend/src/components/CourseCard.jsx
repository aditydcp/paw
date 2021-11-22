import Button from "./Button"

const { default: Card } = require("./Card")

const CourseCard = () => {
    return (
        <Card>
            <div className="flex flex-col">
                <p className="text-lg font-bold">Pengembangan Aplikasi Web (A)</p>
                <p className="mb-6">TIF213146</p>
                <div className="flex items-center">
                    <p className="flex-grow">42 assignments</p>
                    <Button className="self-end">
                        Details
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default CourseCard