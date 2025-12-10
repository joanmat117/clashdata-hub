import { ValidationError } from '../utils/Errors.js'
import { handleError } from '../utils/handleError.js'
import { isPlayerKey } from '../utils/isPlayerKey.js'
import { validateTag } from '../utils/validateTag.js'
import {ClashRoyaleService} from './../services/ClashRoyaleService.js'
import { Response,Request } from 'express'

export class PlayerController {

  static getPlayer = async (req:Request,res:Response)=>{
    try {
    const tagWithoutHash = req.params.tag
    if(!validateTag(tagWithoutHash)) throw new ValidationError('Invalid player tag')

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
  static getPlayerProperty = async(req:Request,res:Response)=>{
    try {
    const {tag:tagWithoutHash,property} = req.params

    if(!validateTag(tagWithoutHash)) throw new ValidationError('Invalid player tag')


    const tag = `#${tagWithoutHash}`

    const player = await ClashRoyaleService.getPlayerData(tag)

    if (!isPlayerKey(property)) {
      throw new ValidationError(`Invalid player property: ${property}`);
    }
    
    const data = player[property]
    
      return res.json({
        success:true,
        data
      })
    } catch (e:any){
      handleError(res,e)
    }
  }

  static getPlayerBattles = async (req:Request,res:Response)=>{
    try{
    const {tag:tagWithoutHash} = req.params

    if(!validateTag(tagWithoutHash)) throw new ValidationError('Invalid player tag')

    const tag = `#${tagWithoutHash}`
    
    const playerBattles = await ClashRoyaleService.getPlayerBattleLog(tag)
    
    return {
      success:true,
      data:playerBattles
    }

    } catch(e:any){
      handleError(res,e)
    }
  }
}
