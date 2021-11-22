import { Routes, Route, Link } from "react-router-dom"

const SidebarButton = ({ iconCode, href, ...props }) => {
    return (
        <Link to={href} className={`${iconCode} text-white text-3xl p-3 bg-gray-400 rounded-full`} {...props}>
            
        </Link>
    )
}

export default SidebarButton