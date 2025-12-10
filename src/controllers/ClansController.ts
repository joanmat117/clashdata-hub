import { ClashRoyaleService } from "../services/ClashRoyaleService.js"
import {Request,Response} from 'express'
import { validateTag } from "../utils/validateTag.js"
import { ValidationError } from "../utils/Errors.js"
import { handleError } from "../utils/handleError.js"
import { IClanRequestParams } from "@varandas/clash-royale-api/lib/interfaces/clan.interface.js"

export class ClansController{
  static getClan = async (req:Request,res:Response)=>{
    try{
      const tagWithoutHash = req.params.tag

      if(!validateTag(tagWithoutHash)) throw new ValidationError('Invalid clan tag')

      const tag = `#${tagWithoutHash}`

      const data = await ClashRoyaleService.getClanData(tag)
      
      return res.json({
        success:true,
        data
      })

    } catch(e:any){
      handleError(res,e)
    }
  }

  static getClanWarLog = async(req:Request,res:Response)=>{
      try {
        const tagWithoutHash = req.params.tag
        
        if(!validateTag(tagWithoutHash)) throw new ValidationError('Invalid clan tag')

        const tag = `#${tagWithoutHash}`

        const data = await ClashRoyaleService.getClanWarLog(tag)

        return res.json({
          success:true,
          data
      })
      
      } catch (e) {
        handleError(res,e) 
      }
  }

  static getClanMembers = async(req:Request,res:Response)=>{
    try {
    const tagWithoutHash = req.params.tag
    if(!validateTag(tagWithoutHash)) throw new ValidationError('Invalid clan tag')

      const tag = `#${tagWithoutHash}`

      const data = await ClashRoyaleService.getClanMembers(tag)
      return res.json({
        success:true,
        data
      })

    } catch(e:any){
      handleError(res,e)
    }
  }

  static getClansBySearch = async(req:Request,res:Response)=>{
    try {

      const {name,minScore,after,before,locationId,maxMembers,minMembers}: IClanRequestParams = req.query
      const limit = Number(req.query.limit) < 100 ? Number(req.query.limit) : 5

      const data = await ClashRoyaleService.getClansBySearch({
        limit,
        name,
        minScore,
        minMembers,
        maxMembers,
        locationId,
        before,
        after
      })

      return res.json({
        success:true,
        data
      })

    } catch(e:any){
      handleError(res,e)
    }
  }

}
