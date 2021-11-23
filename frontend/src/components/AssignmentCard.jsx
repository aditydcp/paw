import useRealtimeAssignment from "../hooks/use-realtime-assignment"
import FlatCard from "./FlatCard"

const AssignmentCard = ({ assignmentId, ...props }) => {
    const assignment = useRealtimeAssignment(assignmentId)

    return (
        <FlatCard {...props}>
            {(() => {
                if (assignment) {
                    return (
                        <>
                            <p className="font-bold">{assignment.title}</p>
                            <p className="mb-4">{assignment.deadline}</p>
                            <p className="line-clamp-3">{assignment.details}</p>
                        </>
                    )
                } else {
                    return <p>Loading assignment details...</p>
                }
            })()}
        </FlatCard>
    )
}

export default AssignmentCard