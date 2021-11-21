import { Router } from 'express'
import routeHandlerErrorWrapper from '../common/route-handler-error-wrapper.js'

const AssignmentsRouter = (assignmentUseCases, dtoMapper) => {
    const router = Router()

    router.post('/courses/:courseId/assignments', routeHandlerErrorWrapper(async (req, res) => {
        let assignment = await assignmentUseCases.create(req.params.courseId, req.body)

        let dto = dtoMapper.map(assignment)

        res.status(201)
        res.send(JSON.stringify(dto))
    }))

    router.get('/assignments', routeHandlerErrorWrapper(async (req, res) => {
        let keywords = req.query.keywords
        let start = req.query.start ? parseInt(req.query.start) : 0
        let count = req.query.count ? parseInt(req.query.count) : 1000

        let assignments = await assignmentUseCases.search(keywords, start, count)

        let dtos = assignments.map(dtoMapper.map)

        res.send(JSON.stringify(dtos))
    }))

    router.get('/assignments/:id', routeHandlerErrorWrapper(async (req, res) => {
        let assignment = await assignmentUseCases.readById(req.params.id)

        if (assignment) {
            let dto = dtoMapper.map(assignment)

            res.send(JSON.stringify(dto))   
        } else {
            res.sendStatus(404)
        }
    }))

    router.put('/assignments/:id', routeHandlerErrorWrapper(async (req, res) => {
        let assignment = await assignmentUseCases.update(req.params.id, req.body)

        if (assignment) {
            let dto = dtoMapper.map(assignment)

            res.send(JSON.stringify(dto))   
        } else {
            res.sendStatus(404)
        }
    }))

    router.delete('/assignments/:id', routeHandlerErrorWrapper(async (req, res) => {
        let assignment = await assignmentUseCases.delete(req.params.id)

        if (assignment) {
            let dto = dtoMapper.map(assignment)

            res.send(JSON.stringify(dto))   
        } else {
            res.sendStatus(404)
        }
    }))

    return router
}

export default AssignmentsRouter