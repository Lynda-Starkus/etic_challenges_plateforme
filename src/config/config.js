import dotenv from 'dotenv'

dotenv.config();

export default{
  port: process.env.PORT,
  devDatabaseUrl: process.env.DEV_DATABASE_URL
}

