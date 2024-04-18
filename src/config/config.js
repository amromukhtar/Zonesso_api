import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: 'config.env' });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .default('production'),
    PORT: Joi.number().default(4001),
    DATABASE_CONNECTION: Joi.string()
      .description('MongoDB URL')
      .default('mongodb://127.0.0.1:27017/dinewiz'),
    JWT_SECRET: Joi.string()
      .description('JWT Secret Key')
      .default(
        'Sht0ARObu4p304rUUvcn+JY0jwPONEgVuMDSeGW6hrkZcjEAX0ImVsPrQTsC1qxxTTUxKIMQhCWQQ509a60d30PeWUN1YS/Z5pa1VB4+2KWaNcVJ9mqj0Q6sLkTTsaFavssgg8jD5vCpRH3E3Ji+8KpoPUBjks2msex2Pz7FpcNCwTXlb15Yz5HeW3p3wRKMSls0PLPYDiGMuBKk0Gn6j7aOgVdR3v+J60N6/dVIN5TfPPmP1Z8hAMm6m2ks1Nufd01801c235Ecp1YlMhoNombAKoltWrSpD7PVTigMRWP6sIulIbBmqMTCipCqkboHvyWyBMuhrjFY6qsd/uWoiQ=='
      ),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(100)
      .description('Minutes After Which Access Tokens Expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('Days After Which Refresh Tokens Expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('Minutes After Which Reset Password Token Expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('Minutes After Which Verify Email Token Expires')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  server: {
    port: envVars.PORT
  },
  db: {
    url: envVars.DATABASE_CONNECTION
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  }
};

export default config;
