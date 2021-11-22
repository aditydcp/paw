const Card = ({ children, ...props }) => {
    return (
        <span className="p-6 shadow-md border-2 rounded-md bg-white" {...props}>
            {children}
        </span>
    )
}

export default Card