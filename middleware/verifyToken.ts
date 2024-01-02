// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'; 
dotenv.config();
interface User {
  _id: string
  isAdmin: true
}

export default async function (context: any): Promise<User | undefined> {
  var token
  let authHeader = context.headers.Authorization;

  if(authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(" ")[1]
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN ?? '')
      return user as User
    }catch (error: any){
      console.log(error)
    }
  }

  if(!token){

    return
  }
};
