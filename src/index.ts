import express, {json} from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import dotenv from 'dotenv'
import {playerRouter} from './routes/player.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || '3000'

app.use(json())
app.use(corsMiddleware())

app.get('/',(_,res)=>res.json('API Base'))
app.use('/player',playerRouter)

app.listen(PORT,()=>{
  console.log(`Server listening on http://localhost:${PORT}`)
})

