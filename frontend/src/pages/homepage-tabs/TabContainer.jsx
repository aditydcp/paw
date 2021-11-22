const TabContainer = ({ children, ...props }) => {
    return (
        <div className="bg-gradient-to-bl h-screen from-blue-200 to-indigo-300 flex-grow overflow-y-scroll" {...props}>
            {children}
        </div>
    )
}

export default TabContainer