import { useState } from "react";
import Button from "../../components/Button"
import Card from "../../components/Card"
import CourseCard from "../../components/CourseCard"
import FloatingActionButton from "../../components/FloatingActionButton"
import TabContainer from "./TabContainer"
import Icon from "../../components/Icon"
import AddCourseModal from "../../modals/AddCourseModal";

const SearchCoursesTab = ({ ...props }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const openModal = () => {
        setModalVisible(true)
    }

    return (
        <div className="w-full h-full flex flex-col items-center" {...props}>
            <AddCourseModal visible={modalVisible} setVisible={setModalVisible} />
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
            <FloatingActionButton className="absolute bottom-8 right-16" onClick={openModal}>
                <Icon iconCode="icon-plus" className="text-white text-3xl" />
            </FloatingActionButton>
        </div>
    )
}

export default SearchCoursesTab