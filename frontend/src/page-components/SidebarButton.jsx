import { Routes, Route, Link } from "react-router-dom"
import Icon from "../components/Icon"

const SidebarButton = ({ iconCode, href, ...props }) => {
    return (
        <Link to={href} className="text-white text-3xl p-3 bg-gray-400 rounded-full" {...props}>
            <Icon iconCode={iconCode} />
        </Link>
    )
}

export default SidebarButton