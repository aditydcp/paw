import SearchCoursesTab from "./homepage-tabs/SearchCoursesTab"
import Sidebar from "../page-components/Sidebar"
import TabContainer from "./homepage-tabs/TabContainer"
import AssignmentsTab from "./homepage-tabs/AssignmentsTab"
import { Routes, Route } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <TabContainer>
                <Routes>
                    <Route path="/" element={<SearchCoursesTab />} />
                    <Route path="/myassignments" element={<AssignmentsTab />} />
                </Routes>
                <AssignmentsTab />
            </TabContainer>
        </div>
    )
}

export default HomePage