import Course from '../schemas/course.js'
import Assignment from '../schemas/assignment.js'
import mongoose from 'mongoose';

class AssignmentRepository {
    async createAssignment(courseId, assignment) {
        let newAssignment = new Assignment({
            courseId,
            ...assignment
        })

        await newAssignment.save()

        return newAssignment.toObject()
    }

    async readAssignmentById(id) {
        return await Assignment
            .findById(id)
            .lean()
            .exec()
    }

    async readAssignmentsByCourseId(courseId) {
        return await Assignment
            .find({
                courseId
            })
            .lean()
            .exec()
    }

    async searchAssignments(keywords, start, count) {
        throw new Error("No need for this to be implemented yet.")
    }

    async updateAssignment(id, assignment) {
        let oldAssignment = await Assignment.findById(id).exec()

        return await Assignment
            .findByIdAndUpdate(
                id, {
                    ...assignment,
                    courseId: oldAssignment.courseId
                }, {
                    new: true,
                    overwrite: true
                })
            .lean()
            .exec()
    }

    async deleteAssignment(id) {
        return await Assignment
            .findByIdAndDelete(id)
            .lean()
            .exec()
    }
}

export default AssignmentRepository