import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { HttpStatusCode } from 'axios'

type AppErrorJSONObject = { code: number; message: string; error?: unknown }

type ErrorResult = {
  property: string
  constraints?: Array<string>
  children?: Array<ErrorResult>
}

class AppValidationError extends Error {
  errors: Array<ErrorResult>

  constructor(errors: Array<ValidationError>) {
    super('Validation Error')

    this.errors = errors.map((e) => this.getValidationErrorObject(e))
  }

  public getValidationErrorObject(error: ValidationError): ErrorResult {
    return {
      property: error.property,
      constraints: error.constraints ? Object.values(error.constraints) : undefined,
      children: error.children?.length ? error.children.map((error) => this.getValidationErrorObject(error)) : undefined,
    }
  }

  toJSONObject(): AppErrorJSONObject {
    return {
      message: this.message,
      error: this.errors,
      code: HttpStatusCode.BadRequest,
    }
  }
}

const requestAttributeValidator =
  (attribute: 'body' | 'params' | 'query' | 'mergedData') =>
  (dto: ClassConstructor<object>): RequestHandler =>
  async (req: Request, response: Response, next: NextFunction): Promise<void> => {
    const instance = plainToInstance(dto, req[attribute], {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })

    const errors = await validate(instance, {
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })

    if (errors.length) {
      const err = new AppValidationError(errors).toJSONObject()
      response.status(err.code).send(err)
    } else {
      req[attribute] = { ...instance }
      next()
    }
  }

export const validateBody = requestAttributeValidator('body')
export const validateQuery = requestAttributeValidator('query')
export const validateParams = requestAttributeValidator('params')
export const validateMergedData = requestAttributeValidator('mergedData')
