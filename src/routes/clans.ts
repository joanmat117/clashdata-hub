import express, {type Router} from 'express'
import { ClansController } from '../controllers/ClansController.js'

const router:Router = express.Router()

router.get('/:tag/wars',ClansController.getClanWarLog)

router.get('/:tag/members',ClansController.getClanMembers)

router.get('/:tag',ClansController.getClan)

export {
  router as clansRouter
}
