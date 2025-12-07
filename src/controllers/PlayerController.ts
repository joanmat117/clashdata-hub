import {ClashRoyaleService, ClashRoyaleServiceDependencies} from './../services/ClashRoyaleService.js'
import { Response,Request } from 'express'

export class PlayerController {
  private api:ClashRoyaleService
  
  constructor(config:ClashRoyaleServiceDependencies){
    this.api = new ClashRoyaleService(config)
  }

  getPlayer = async (req:Request,res:Response)=>{
    const tagWithoutHash = req.params.tag
    if(!tagWithoutHash){
      return res.json({
        success:false,
        data:null,
        message:'Invalid player tag'
      })
    }
    const tag = `#${tagWithoutHash}`

    const data = await this.api.getPlayerData(tag)
    console.log(`Data recuperada de ${tag} :`,data)
    return res.json({
      success:true,
      data:data,
      message:''
    })
  }

}
