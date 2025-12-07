import {ClashRoyaleAPI} from '@varandas/clash-royale-api'
import { AppError, NotFoundError } from '../utils/Errors.js'

export interface ClashRoyaleServiceDependencies {
  baseUrl:string
}

export type ClashRoyaleTag = string

const clashRoyaleAPI = new ClashRoyaleAPI(
  process.env.CRK as string,
  'https://proxy.royaleapi.dev/v1'
)

export class ClashRoyaleService {
  
  static getCards = async ()=>{
    try {
      const data = await clashRoyaleAPI.getCards()
      return data
    } catch (e:any) {
      throw new AppError('Error retrieving the cards')
    }
  }

  static getPlayerData = async (tag:ClashRoyaleTag)=>{
    try{
    const data = await clashRoyaleAPI.getPlayerByTag(tag)  
    return data
    } catch (e:any){
      if(e.response.data.reason === 'notFound') throw new NotFoundError('Player not found')
      else {
        throw new AppError(e.response.statusText || 'Internal error',e.response.status || 500)
      }
    }
  }

  static getClanData = async (tag:ClashRoyaleTag)=>{
    try {
    const data = await clashRoyaleAPI.getClanByTag(tag)
    return data
    } catch (e:any){
      if(e.response.data.reason === 'notFound') throw new NotFoundError('Clan not found')
      else {
        throw new AppError(e.response.statusText || 'Internal error',e.response.status || 500)
      }
    }
  }

  static getClanWarLog = async (tag:ClashRoyaleTag)=>{
    try {
    const data = await clashRoyaleAPI.getClanWarlog(tag)
    return data
    } catch (e:any){
      if(e.response.data.reason === 'notFound') throw new NotFoundError('Clan War Log not found')
      else {
        throw new AppError(e.response.statusText || 'Internal error',e.response.status || 500)
      }
    }

  }
}

