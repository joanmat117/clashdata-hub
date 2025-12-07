import express, {type Router} from "express";
import { PlayerController } from "../controllers/PlayerController.js";

const playerRouter:Router = express.Router()

const playerController = new PlayerController({
  key:process.env.CLASH_ROYALE_KEY as string,
  baseUrl:'https://api.clashroyale.com/' //'https://proxy.royaleapi.dev/v1' 
})

playerRouter.get('/env',(_,res)=>{
  return res.json(`ENV NAME es : ${process.env.CLASH_ROYALE_KEY}`)
})
playerRouter.get('/:tag',playerController.getPlayer)

export {playerRouter}
