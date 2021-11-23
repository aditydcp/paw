const FlatCard = ({ children, ...props }) => {
    return (
        <span className="p-6 border-2 rounded-md bg-white" {...props}>
            {children}
        </span>
    )
}

export default FlatCard