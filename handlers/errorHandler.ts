import { Request, Response, NextFunction } from 'express'
// import CustomError from '../helpers/customError'
import { statusCodes } from '../constants/statusCodes'
// import * as yup from 'yup'

const customErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let errorMessage = ''
        let statusCode = 500

        switch (err.name) {
            case 'MongoError':
                if (err.code === 11000) {
                    errorMessage = 'Duplicate Field Value Entered'
                    statusCode = statusCodes.NOT_FOUND
                }
                break

            case 'SyntaxError':
                errorMessage = 'Unexpected Syntax'
                statusCode = statusCodes.BAD_REQUEST
                break

            case 'RangeError':
                errorMessage = 'Range Error'
                statusCode = statusCodes.INTERNAL_SERVER_ERROR
                break

            //   case 'ValidationError':
            //     if (err instanceof yup.ValidationError) {
            //       errorMessage = err.errors.join(', ') // Extracting the error messages
            //     } else {
            //       errorMessage = 'Validation Error'
            //     }
            //     statusCode = errorCodes.BAD_REQUEST
            //     break

            case 'SequelizeUniqueConstraintError':
                errorMessage = 'Duplicate Values Entered'
                statusCode = statusCodes.BAD_REQUEST
                break

            case 'CastError':
                errorMessage = 'Please provide a valid ID'
                statusCode = statusCodes.BAD_REQUEST
                break

            case 'TokenNotFoundError':
                errorMessage = 'Token Not Found'
                statusCode = statusCodes.NOT_FOUND
                break

            case 'TokenExpiredError':
                errorMessage = 'JWT expired'
                statusCode = statusCodes.UNAUTHORIZED
                break

            case 'SequelizeValidationError':
                errorMessage = 'Validation Failed'
                statusCode = statusCodes.INTERNAL_SERVER_ERROR
                break;

            case 'JsonWebTokenError':
                errorMessage = 'JWT malformed'
                statusCode = statusCodes.UNAUTHORIZED
                break

            case 'ForbiddenError':
                ; (errorMessage = "Not permitted Because you aren't admin "),
                    (statusCode = statusCodes.FORBIDDEN)
                break

            case 'CategoryNotFoundError':
                ; (errorMessage = 'The Category you are looking for is not found '),
                    (statusCode = statusCodes.NOT_FOUND)
                break

            default:
                errorMessage = 'Server Error'
                statusCode = statusCodes.INTERNAL_SERVER_ERROR
                break
        }

        console.log('Custom Error Handler => ', err.name, errorMessage, statusCode, err.message)

        if (res) {
            return res.status(statusCode).json({
                success: false,
                error: errorMessage
            })
        } else {
            throw new Error('Response object is not defined')
        }
    } catch (error) {
        next(error) // Forward the error to the next error handler
    }
}

export default customErrorHandler
