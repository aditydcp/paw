import useRealtimeAssignment from "../hooks/use-realtime-assignment"
import FlatCard from "./FlatCard"

const AssignmentCard = ({ initialAssignment, ...props }) => {
    const [assignment] = useRealtimeAssignment(initialAssignment)

    return (
        <FlatCard {...props}>
            {assignment 
            ?   <>
                    <p className="font-bold">{assignment.title}</p>
                    <p className="mb-4">{assignment.deadline}</p>
                    <p className="line-clamp-3">{assignment.details}</p>
                </>
            :   <p>Loading assignment details...</p>}
            
        </FlatCard>
    )
}

export default AssignmentCard