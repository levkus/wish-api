require('dotenv').config()

const sharedConfig = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'postgres',
  // logging: false,
}

module.exports = {
  development: {
    ...sharedConfig,
  },
  production: {
    ...sharedConfig,
  },
}
