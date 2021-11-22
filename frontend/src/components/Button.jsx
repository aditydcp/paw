const Button = ({ children, onClick, danger, ...props }) => {
    return (
        <span {...props}>
            <button onClick={onClick} className={`rounded-md p-2 shadow-sm ${danger ? "bg-red-400" : "bg-blue-400"}`}>
                {children}
            </button>
        </span>
    )
}

export default Button