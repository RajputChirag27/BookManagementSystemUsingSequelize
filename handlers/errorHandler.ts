import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
// import { AuthRequest } from '../interface'

const customErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(
      'Custom Error Handler => ',
      err.name, 
      err.message,
      err.statusCode,
      err.message
    );

    if (res) {
      return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message,
        // errors : err
      });
    } else {
      throw new CustomError(
        'Response object is not defined',
        500,
        'Internal Server Error'
      );
    }
  } catch (error) {
    next(error); // Forward the error to the next error handler
  }
};

export default customErrorHandler;
