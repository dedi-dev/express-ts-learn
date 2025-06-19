import { Request, Response, Router } from 'express'

const route = Router()

route.get('/products', (req: Request, res: Response) => {
  console.info('GET /products')
  console.error('This is an error message')
  res.status(200).json({
    message: 'Product route'
  })
})

export default route
