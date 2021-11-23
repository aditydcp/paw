import Button from "../../components/Button"
import Card from "../../components/Card"
import CourseCard from "../../components/CourseCard"
import FloatingActionButton from "../../components/FloatingActionButton"
import TabContainer from "./TabContainer"
import Icon from "../../components/Icon"
import { useEffect, useRef, useState } from "react"
import searchCourses from "../../api/search-courses"

const SearchCoursesTab = ({ ...props }) => {
    const [courses, setCourses] = useState([])

    const formRef = useRef(null)

    const handleSearch = async (event) => {
        event.preventDefault()

        setCourses(await searchCourses(event.target.keywords.value ?? "", 0, 100))
    }

    return (
        <div className="w-full h-full flex flex-col items-center" {...props}>
            <p className="mb-8 text-3xl mt-1/4-screen">Find a course!</p>
            <form ref={formRef} onSubmit={handleSearch} className="w-1/2">
                <input name="keywords" placeholder="Search courses" type="text" className="border-2 rounded-md p-2 mb-8 w-full" />    
            </form>
            <div className="grid grid-cols-3 gap-4 px-16 w-full">
                {courses.map(({ id, name, code }) => <CourseCard key={id} id={id} name={name} code={code} />)}
            </div>
            <FloatingActionButton className="absolute bottom-8 right-16">
                <Icon iconCode="icon-plus" className="text-white text-3xl" />
            </FloatingActionButton>
        </div>
    )
}

export default SearchCoursesTab