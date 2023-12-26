// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import jwt from 'jsonwebtoken'
export default async function ( context: any) {
  var token
  let authHeader = context.headers.Authorization;

  if(authHeader && authHeader.starsWith('Bearer')){
    token = authHeader.split(" ")[1]
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN ?? '')
      return user
    }catch (error: any){
      return null
    }
  }

  if(!token){

    return null
  }
};
