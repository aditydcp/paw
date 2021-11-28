import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
})

courseSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true
    next()
})

courseSchema.pre('findByIdAndUpdate', function(next) {
    this.options.runValidators = true
    next()
})

courseSchema.index({
    code: 'text',
    name: 'text'
})

const Course = mongoose.model('Course', courseSchema)

export default Course