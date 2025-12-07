import express, {type Router} from "express";
import { CardsController } from "../controllers/CardsController.js";

const router:Router = express.Router()

router.get('/',CardsController.getAll)

export {
  router as cardsRouter
}
