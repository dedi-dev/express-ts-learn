import { Router } from 'express'
import productRoute from './product.route'

const appRoute = Router()

appRoute.use('/api', productRoute)

export default appRoute
