import loggingLevel from '../common/logging-level.js'
import { performance } from 'perf_hooks'
import { createHash } from 'crypto'
import EventTopics from '../common/event-topics.js'

class CourseUseCases {
    constructor(courseRepository, cachingService = null, loggingService = null, pubsub, dtoMapper) {
        this.courseRepository = courseRepository
        this.cachingService = cachingService
        this.loggingService = loggingService
        this.pubsub = pubsub
        this.dtoMapper = dtoMapper
    }

    async create(course) {
        let newCourse = await this.courseRepository.createCourse(course)

        this.loggingService?.log(loggingLevel.informational, `Course ${newCourse.code} successfully created.`)
        
        return newCourse
    }

    async readById(id) {
        let queryStartTime = performance.now()
                
        let course = await this.cachingService?.fetchCachedObject(`course:${id}`)
        
        if (course) {
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational, 
                `Course queried with cache hit. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        } else {
            course = await this.courseRepository.readCourse(id)

            if (!course) {
                this.loggingService?.log(
                    loggingLevel.informational, 
                    'Course queried with no result.'    
                )

                return null
            }
            
            await this.cachingService?.cacheObject(`course:${id}`, course, 10000)
            
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational,
                `Course queried with cache miss. Result cached. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        }

        return course
    } 

    async search(keywords, start, count) {
        let queryStartTime = performance.now()
                
        let requestHash = createHash('md5').update(`${keywords}-${start}-${count}`).digest('base64')
        
        let courses = await this.cachingService?.fetchCachedObject(`coursesearch:${requestHash}`)
        
        if (courses) {
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational, 
                `Courses queried with cache hit. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        } else {
            courses = await this.courseRepository.searchCourses(keywords, start, count)
            
            await this.cachingService?.cacheObject(`coursesearch:${requestHash}`, courses, 10000)
            
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational, 
                `Courses queried with cache miss. Results cached. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        }

        return courses
    }

    async update(id, course) {
        let updatedCourse = await this.courseRepository.updateCourse(id, course)
        
        if (!updatedCourse) {
            return null
        }

        this.pubsub.publish(`${EventTopics.courseUpdated}:${id}`, {
            [EventTopics.courseUpdated]: this.dtoMapper.mapToSimple(updatedCourse)
        })
            
        this.loggingService?.log(loggingLevel.informational, `Course ${updatedCourse.code}(id: ${updatedCourse.id}) successfully updated.`)
        
        return updatedCourse
    }

    async delete(id) {
        let course = await this.courseRepository.deleteCourse(id)
        
        if (!course) {
            return null
        }

        this.pubsub.publish(`${EventTopics.courseDeleted}:${id}`, {
            [EventTopics.courseDeleted]: this.dtoMapper.mapToSimple(course)
        })

        this.loggingService?.log(loggingLevel.informational, `Course ${id} successfully deleted.`)
        
        return course
    }
}

export default CourseUseCases