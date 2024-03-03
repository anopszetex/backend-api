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
