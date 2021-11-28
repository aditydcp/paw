import mongoose from 'mongoose'
const { Types } = mongoose

export const assignmentSchema = mongoose.Schema({
    courseId: {
        type: Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
})

const Assignment = mongoose.model('Assignment', assignmentSchema)

export default Assignment
