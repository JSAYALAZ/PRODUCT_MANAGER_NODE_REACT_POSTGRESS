import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import morgan from 'morgan'
import cors, {CorsOptions} from 'cors'
import swaggerUI, { serve } from 'swagger-ui-express'
import swaggerSpec, {swaggerUIOptions} from "./config/swagger";


export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        
    } catch (error) {
        console.log(colors.red('ERROR AL CONECTAR A LA DB'))
    }
}
connectDB();
const server = express()

const corsOptions :CorsOptions={
    origin: function(origin, callback){
        if(origin===process.env.FRONTEND_URL || origin==='http://localhost:4000/'
        ){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS, no acceder perra'))
        }
    }
}

server.use(cors(corsOptions))

//leer datos de formulario
server.use(express.json())
server.use(morgan('dev'))


server.use('/api/', router)

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server