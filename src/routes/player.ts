import express, {type Router} from "express";
import { PlayerController } from "../controllers/PlayerController.js";

const router:Router = express.Router()

router.get('/:tag/battles',PlayerController.getPlayerBattles)

router.get('/:tag/:property',PlayerController.getPlayerProperty)

router.get('/:tag',PlayerController.getPlayer)

export {
  router as playerRouter
}
