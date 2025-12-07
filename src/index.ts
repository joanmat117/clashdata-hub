import express, {json} from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const PORT = process.env.PORT || '3000'

app.use(json())
app.use(corsMiddleware())
app.get('/get',(_req,res)=>{
  return res.json('Wowwwwww')
})

app.listen(PORT,()=>{
  console.log(`Server listening on http://localhost:${PORT}`)
})

