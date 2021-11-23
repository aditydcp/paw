const Button = ({ children, onClick, danger, down, ...props }) => {
    return (
        <span {...props}>
            <button onClick={onClick} className={`rounded-md p-2 shadow-sm ${danger ? "bg-red-400" : "bg-blue-400"} ${!down || "filter brightness-90 transform scale-90"}`}>
                {children}
            </button>
        </span>
    )
}

export default Button