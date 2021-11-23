import Button from "../../components/Button"
import Card from "../../components/Card"
import CourseCard from "../../components/CourseCard"
import AddCourseModal from "../../modals/AddCourseModal";
import FloatingActionButton from "../../components/FloatingActionButton"
import TabContainer from "./TabContainer"
import Icon from "../../components/Icon"
import { useEffect, useRef, useState } from "react"
import searchCourses from "../../api/search-courses"

const SearchCoursesTab = ({ ...props }) => {
    const [courses, setCourses] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    const formRef = useRef(null)

    useEffect(() => {
        search("")
    }, [])

    const search = async (keywords) => setCourses(await searchCourses(keywords, 0, 100))

    const handleSearch = async (event) => {
        event.preventDefault()

        await search(event.target.keywords.value ?? "")
    }

    const openModal = () => {
        setIsAdding(true)
    }

    return (
        <div className="w-full h-full flex flex-col items-center" {...props}>
            <AddCourseModal visible={isAdding} setVisible={setIsAdding} />
            <p className="mb-8 text-3xl mt-1/4-screen">Find a course!</p>
            <form ref={formRef} onSubmit={handleSearch} className="w-1/2">
                <input name="keywords" placeholder="Search courses" type="text" className="border-2 rounded-md p-2 mb-8 w-full" />    
            </form>
            <div className="grid grid-cols-3 gap-4 px-16 w-full pb-8">
                {courses.map(({ id, name, code }) => <CourseCard key={id} id={id} name={name} code={code} />)}
            </div>
            <FloatingActionButton className="absolute bottom-8 right-16" onClick={openModal}>
                <Icon iconCode="icon-plus" className="text-white text-3xl" />
            </FloatingActionButton>
        </div>
    )
}

export default SearchCoursesTab