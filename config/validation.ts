import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'test',
    'provision'
  ),
  PORT: Joi.number().default(3000),
  DB_TYPE: Joi.string().default('postgres'),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.number().default(5432),
  DB_NAME: Joi.required(),
  DB_USERNAME: Joi.required(),
  DB_PASSWORD: Joi.required()
});
