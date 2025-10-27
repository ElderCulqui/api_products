import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
    models: [__dirname + '/../models/**/*'],
    logging: false
})

export default db