import {ClashRoyaleAPI} from '@varandas/clash-royale-api'

export interface ClashRoyaleServiceDependencies {
  key:string,
  baseUrl:string
}

export type ClashRoyaleTag = string

export class ClashRoyaleService {
  
  private api:ClashRoyaleAPI

  constructor({key,baseUrl}:ClashRoyaleServiceDependencies){
    this.api = new ClashRoyaleAPI(key,baseUrl)
  }

  getPlayerData = async (tag:ClashRoyaleTag)=>{
    try{
    const data = await this.api.getPlayerByTag(tag)  
    return data
    } catch (e){
      console.log(e)
    }
  }

  getClanData = async (tag:ClashRoyaleTag)=>{
    const data = await this.api.getClanByTag(tag)
    return data
  }

  getClanWarLog = async (tag:ClashRoyaleTag)=>{
    const data = await this.api.getClanWarlog(tag)
    return data
  }
}

