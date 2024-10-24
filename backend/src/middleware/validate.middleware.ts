import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: Record<string, string[]> = {};

        error.errors.forEach(err => {
          const field = err.path.join('.');

          if (validationErrors[field]) {
            validationErrors[field].push(err.message);
          } else {
            validationErrors[field] = [err.message];
          }
        });

        res.status(422).json({
          message: 'Validation error',
          errors: validationErrors,
        });
        return;
      }
      
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
