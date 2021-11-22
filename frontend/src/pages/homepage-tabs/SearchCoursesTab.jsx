import Button from "../../components/Button"
import Card from "../../components/Card"
import CourseCard from "../../components/CourseCard"
import FloatingActionButton from "../../components/FloatingActionButton"
import TabContainer from "./TabContainer"

const SearchCoursesTab = ({ ...props }) => {
    return (
        <div className="w-full h-full flex flex-col items-center" {...props}>
            <p className="mb-8 text-3xl mt-1/4-screen">Find a course!</p>
            <input placeholder="Search courses" type="text" className="border-2 rounded-md p-2 mb-8 w-1/2" />
            <div className="grid grid-cols-3 gap-4 px-16 w-full">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
            <FloatingActionButton className="absolute bottom-8 right-16">
                <p className="icon-plus text-white text-3xl">
                
                </p>
            </FloatingActionButton>
        </div>
    )
}

export default SearchCoursesTab