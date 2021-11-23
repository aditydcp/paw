import SidebarButton from "./SidebarButton"

const Sidebar = () => {
    return (
        <nav className="bg-gray-600 p-2 pt-4 flex flex-col">
            <div className="flex flex-col gap-6 flex-grow">
                <SidebarButton iconCode="icon-graduation" href="/" />
                <SidebarButton iconCode="icon-notebook" href="/myassignments" />
            </div>
            <SidebarButton iconCode="icon-settings" href="/settings" />
        </nav>
    )
}

export default Sidebar