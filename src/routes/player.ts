import express, {type Router} from "express";
import { PlayerController } from "../controllers/PlayerController.js";

const router:Router = express.Router()

router.get('/:tag',PlayerController.getPlayer)


export {
  router as playerRouter
}
