import express from "express";
import colors from "colors"
import cors, { type CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bgBlue.bold('DB connected'))        
    } catch (error) {
        console.log(colors.bgRed.bold('Error al conectar a la base de datos'))
    }
}
connectDB()
const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function (origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de cors'))
        }
    }
}
server.use(cors(corsOptions))

server.use(morgan('dev'))
server.use(express.json())

server.use('/api/products', router)

//Docs
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server