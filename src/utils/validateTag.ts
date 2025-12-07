export function validateTag(tag:string){
  if(typeof tag !== 'string') return false;
  return /^[0289PYLQGRJCUV]{3,}$/.test(tag)
}
