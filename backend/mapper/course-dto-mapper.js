import AssignmentDtoMapper from './assignment-dto-mapper.js'

const CourseDtoMapper = {
    map: (course) => {
        let { _id, __v, ...courseFields } = course
        
        return {
            id: _id,
            ...courseFields,
        }
    }
}

export default CourseDtoMapper