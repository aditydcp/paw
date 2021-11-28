import { Router } from 'express';
import routeHandlerErrorWrapper from '../common/route-handler-error-wrapper.js'

const CoursesRouter = (courseUseCases, dtoMapper) => {
    const router = Router()
    
    router.post('/courses', routeHandlerErrorWrapper(async (req, res) => {
        let course = await courseUseCases.create(req.body)

        let dto = dtoMapper.map(course)

        res.send(JSON.stringify(dto))
    }))
    
    router.get('/courses', routeHandlerErrorWrapper(async (req, res) => {
        let keywords = req.query.keywords ?? null
        let start = req.query.start ? parseInt(req.query.start) : 0
        let count = req.query.count ? parseInt(req.query.count) : 1000

        let courses = await courseUseCases.search(keywords, start, count)

        let dtos = courses.map(dtoMapper.map)

        res.send(JSON.stringify(dtos))
    }))
            
    router.get('/courses/:id', routeHandlerErrorWrapper(async (req, res) => {
        let course = await courseUseCases.readById(req.params.id)
        
        if (course) {
            let dto = dtoMapper.map(course)

            res.send(JSON.stringify(dto))
        } else {
            res.sendStatus(404)
        }
    }))
                
    router.put('/courses/:id', routeHandlerErrorWrapper(async (req, res) => {
        let course = await courseUseCases.update(req.params.id, req.body)

        if (course) {
            let dto = dtoMapper.map(course)

            res.send(JSON.stringify(dto))
        } else {
            res.sendStatus(404)
        }
    }))

    router.delete('/courses/:id', routeHandlerErrorWrapper(async (req, res) => {
        let course = await courseUseCases.delete(req.params.id)

        if (course) {
            let dto = dtoMapper.map(course)

            res.send(JSON.stringify(dto))
        } else {
            res.sendStatus(404)
        }
    }))
                        
    return router
}
                    
export default CoursesRouter;
            