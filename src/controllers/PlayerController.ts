import { handleError } from '../utils/handleError.js'
import {ClashRoyaleService} from './../services/ClashRoyaleService.js'
import { Response,Request } from 'express'

export class PlayerController {

  static getPlayer = async (req:Request,res:Response)=>{
    try {
    const tagWithoutHash = req.params.tag
    if(!tagWithoutHash){
      return res.json({
        success:false,
        data:null,
        message:'Invalid player tag'
      })
    }
    const tag = `#${tagWithoutHash}`

    const data = await ClashRoyaleService.getPlayerData(tag)
    return res.json({
      success:true,
      data:data,
    })
    } catch (e:any){
      handleError(res,e)
    }
  }
}
