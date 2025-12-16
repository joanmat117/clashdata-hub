import { Request,Response,NextFunction } from "express"
import { ApiCacheModel } from "../models/apiCacheModel.js"

export const apiCacheMiddleware = ()=>{
   return async (req:Request,res:Response,next:NextFunction)=>{

    if(req.method !== 'GET'){
      return next()
    }


    const cacheKey = ApiCacheModel.generateCacheKey(req)
    const data = await ApiCacheModel.getEndpointCached(cacheKey)

    if(data){
      console.log(`CACHE HIT: ${cacheKey}`)

      return res.json({
        success:true,
        data
      })
    }

    console.log(`CACHE MISS: ${cacheKey}`)

    const originalJson = res.json
    if (!originalJson) {
      console.error('res.json no existe');
      return next();
    }
    
    res.json = function(data:any){

      if(data.success === true){
        console.log('Cacheando respuesta')

        setTimeout(async()=>{
          try {
          const res = await ApiCacheModel.setCacheEndpoint(cacheKey,data.data,{})
          if(!res) throw new Error('Internal Model Error')
          } catch(e){
            console.log('Error al cachear la respuesta: ',e)
          }
        },0)
      }

      return originalJson.call(this,data)
    }
    next()
  }
}
