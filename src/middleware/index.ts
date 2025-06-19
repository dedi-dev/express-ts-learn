import express from 'express'
import cors from 'cors'
import appRoute from '../routes'
import '../utils/winston'

const appMiddleware = express()

appMiddleware.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    preflightContinue: true
  })
)

appMiddleware.use(express.json())
appMiddleware.use(appRoute)

export default appMiddleware
