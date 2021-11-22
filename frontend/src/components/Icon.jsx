const Icon = ({ iconCode, className, ...props }) => {
    return (
        <p className={`${iconCode} ${className} leading-none`} {...props}></p>
    )
}

export default Icon