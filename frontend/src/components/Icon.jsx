const Icon = ({ iconCode, className, ...props }) => {
    return (
        <p className={`${iconCode} ${className} leading-4`} {...props}></p>
    )
}

export default Icon