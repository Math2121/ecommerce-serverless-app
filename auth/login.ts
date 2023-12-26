// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';

import bcrypt from "bcrypt"

import jwt from 'jsonwebtoken'

import { findUserByEmail, saveUser } from '../repository/user/userRepository';

import dotenv from 'dotenv'; 
dotenv.config();


export default async function (params: any, context: any) {
  const {email, password} = params

  if(!email || !password){
    context.status(400)
    return {"message": "All fields are mandatory"}
  }

  const user = await findUserByEmail(email)

  if (!user){
    context.status(401)
    return {"message": "email or password is not valida"}
  }

  const mathcPassword = await bcrypt.compare(password, user.password)
  if(!mathcPassword){
    context.status(401)
    return {"message":"email or password is not valid"}
    
  }

  const token = jwt.sign(
    {
      "_id": user._id,
      "isAdmin": user.isAdmin
    
    },
   `${process.env.ACCESS_TOKEN}`,
    {expiresIn: '1d'}
  )


  const currentUser = {...user, token}
  await saveUser(currentUser)
  return {
    token
  }

};
