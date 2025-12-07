import { ClashRoyaleService } from "../services/ClashRoyaleService.js";
import { Response,Request } from "express";
import { handleError } from "../utils/handleError.js";

export class CardsController {
  static getAll = async(_req:Request,res:Response)=>{
    try {
      const data = await ClashRoyaleService.getCards()
      return res.json({
        success:true,
        data
      })
    } catch (e) {
      handleError(res,e)
    }
  }
}
