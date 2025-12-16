import express, {json} from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import {playerRouter} from './routes/player.js'
import { cardsRouter } from './routes/cards.js'
import { clansRouter } from './routes/clans.js'
import { join,resolve } from 'path'
import { apiCacheMiddleware } from './middlewares/apiCache.js'


const app = express()

const PORT = process.env.PORT || '3000'

app.use(json())
app.use(corsMiddleware())


app.get('/',(_,res)=>{
  const indexPath = join(resolve(process.cwd()),'src','client','index.html')
  res.sendFile(indexPath)
})
// app.use(apiCacheMiddleware())
app.use('/player',playerRouter)
app.use('/cards',cardsRouter)
app.use('/clans',clansRouter)

app.listen(PORT,()=>{
  console.log(`Server listening on http://localhost:${PORT}`)
})

