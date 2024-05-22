import { GraphQLError } from 'graphql';

export class ValidationError extends GraphQLError {
  constructor(message, validationContext) {
    super(message, {
      extensions: {
        code: 'BUSINESS_VALIDATION_FAILED',
        ...validationContext,
      },
    });

    Object.defineProperty(this, 'name', { value: 'ValidationError' });
  }

  static build(message, validationContext) {
    return new ValidationError(message, validationContext);
  }
}

export class AppError extends GraphQLError {
  constructor(message, validationContext) {
    super(message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        ...validationContext,
      },
    });

    Object.defineProperty(this, 'name', { value: 'AppError' });
    Object.defineProperty(this, 'statusCode', { value: 500 });
  }

  static build(message, validationContext) {
    return new AppError(message, validationContext);
  }
}
