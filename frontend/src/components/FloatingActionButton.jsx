const FloatingActionButton = ({ children, onClick, ...props }) => {
    return (
        <span {...props}>
            <button onClick={onClick} className="rounded-full bg-blue-500 p-5 shadow-md">
                {children}
            </button>
        </span>
    )
}

export default FloatingActionButton