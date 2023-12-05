import { Request, Response, NextFunction } from 'express'

interface AsyncFunction {
  (req: Request, res: Response): Promise<void>
}

const catchedAsync = (fn: AsyncFunction) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res).catch((err) => next(err))
  }
}

export default catchedAsync
