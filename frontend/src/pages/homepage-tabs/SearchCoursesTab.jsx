import Button from "../../components/Button"
import Card from "../../components/Card"
import CourseCard from "../../components/CourseCard"
import AddCourseModal from "../../modals/AddCourseModal";
import FloatingActionButton from "../../components/FloatingActionButton"
import TabContainer from "./TabContainer"
import Icon from "../../components/Icon"
import { useEffect, useRef, useState } from "react"
import searchCourses from "../../api/search-courses"
import useRealtimeCourseList from "../../hooks/use-realtime-course-list";

const SearchCoursesTab = ({ ...props }) => {
    const [courses, setCourses] = useRealtimeCourseList([])
    const [isAdding, setIsAdding] = useState(false)

    const formRef = useRef(null)

    useEffect(() => {
        if (!isAdding) {
            search("")
        }
    }, [isAdding])

    const search = async (keywords) => setCourses((await searchCourses(keywords, 0, 100)).map(course => course.id))

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
            <form ref={formRef} onSubmit={handleSearch} className="w-3/4 lg:w-1/2">
                <input name="keywords" placeholder="Search courses" type="text" className="border-2 rounded-md p-2 mb-8 w-full" />    
            </form>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-16 w-full pb-8">
                {courses.map(id => <CourseCard key={id} id={id} />)}
            </div>
            <FloatingActionButton className="absolute bottom-8 right-16" onClick={openModal}>
                <Icon iconCode="icon-plus" className="text-white text-3xl" />
            </FloatingActionButton>
        </div>
    )
}

export default SearchCoursesTab