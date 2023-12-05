import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    error: true,
    message: err.message,
  })
}

export default errorHandler
