import loggingLevel from '../common/logging-level.js'
import { performance } from 'perf_hooks'
import { createHash } from 'crypto'
import EventTopics from '../common/event-topics.js'

class AssignmentUseCases {
    constructor(assignmentRepository, pubsub, dtoMapper, cachingService = null, loggingService = null) {
        this.assignmentRepository = assignmentRepository
        this.cachingService = cachingService
        this.loggingService = loggingService
        this.pubsub = pubsub
        this.dtoMapper = dtoMapper
    }

    async create(courseId, assignment) {
        let createdAssignment = await this.assignmentRepository.createAssignment(courseId, assignment)
        
        this.pubsub.publish(`${EventTopics.assignmentCreated}:${courseId}`, {
            [EventTopics.assignmentCreated]: this.dtoMapper.map(createdAssignment)
        })

        this.loggingService.log(loggingLevel.informational, `Assignment ${createdAssignment.title} was created.`)

        return createdAssignment
    }

    async readById(id) {
        let queryStartTime = performance.now()

        let assignment = await this.cachingService?.fetchCachedObject(`assignment:${id}`)

        if (assignment) {
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational, 
                `Assignment queried with cache hit. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        } else {
            assignment = await this.assignmentRepository.readAssignmentById(id)

            if (!assignment) {
                this.loggingService?.log(loggingLevel.informational, 'Assignment queried with no result.')
        
                return null
            }

            await this.cachingService?.cacheObject(`assignment:${id}`, assignment, 10000)
            
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational, 
                `Assignment queried with cache miss. Result cached. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        }

        return assignment
    }

    async search(keywords, start, count) {
        let queryStartTime = performance.now()

        let requestHash = createHash('md5').update(`${keywords}-${start}-${count}`).digest('base64')

        let assignments = await this.cachingService?.fetchCachedObject(`assignmentsearch:${requestHash}`)

        if (assignments) {
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational, 
                `Assignments queried with cache hit. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        } else {
            assignments = await this.assignmentRepository.searchAssignments(keywords, start, count)

            await this.cachingService?.cacheObject(`assignmentsearch:${requestHash}`, assignments, 10000)
        
            let queryEndTime = performance.now()
            this.loggingService?.log(
                loggingLevel.informational, 
                `Assignments queried with cache miss. Results cached. Query time: ${Math.round(queryEndTime - queryStartTime)} ms.`
            )
        }

        return assignments
    }

    async update(id, assignment) {
        let updatedAssignment = await this.assignmentRepository.updateAssignment(id, assignment)

        if (!updatedAssignment) {
            this.loggingService?.log(loggingLevel.informational, `Assignment ${id} update attempted but document was not found.`)

            return null
        }

        this.pubsub.publish(`${EventTopics.assignmentUpdated}:${id}`, {
            [EventTopics.assignmentUpdated]: this.dtoMapper.map(updatedAssignment)
        })

        this.loggingService?.log(
            loggingLevel.informational, 
            `Assignment ${id} was updated.`
        )

        return updatedAssignment
    }

    async delete(id) {
        let deletedAssignment = await this.assignmentRepository.deleteAssignment(id)

        if (!deletedAssignment) {
            this.loggingService?.log(
                loggingLevel.informational, 
                `Assignment ${id} delete attempted but document was not found.`
            )

            return null
        }

        this.pubsub.publish(`${EventTopics.assignmentDeleted}:${id}`, {
            [EventTopics.assignmentDeleted]: this.dtoMapper.map(deletedAssignment)
        })

        this.loggingService?.log(
            loggingLevel.informational, 
            `Assignment ${id} was deleted.`
        )

        return deletedAssignment
    }
}

export default AssignmentUseCases