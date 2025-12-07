import express, {json} from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import {playerRouter} from './routes/player.js'
import { cardsRouter } from './routes/cards.js'
import { clansRouter } from './routes/clans.js'


const app = express()

const PORT = process.env.PORT || '3000'

app.use(json())
app.use(corsMiddleware())

app.get('/',(_,res)=>res.json('Welcome to ClashData Hub API'))
app.use('/player',playerRouter)
app.use('/cards',cardsRouter)
app.use('/clans',clansRouter)

app.listen(PORT,()=>{
  console.log(`Server listening on http://localhost:${PORT}`)
})

