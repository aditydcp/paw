import FlatCard from "./FlatCard"

const AssignmentCard = ({ title, deadline, details, ...props }) => {
    return (
        <FlatCard {...props}>
            <p className="font-bold">{title}</p>
            <p className="mb-4">{deadline}</p>
            <p className="line-clamp-3">{details}</p>
        </FlatCard>
    )
}

export default AssignmentCard