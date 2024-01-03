// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import bcrypt from "bcrypt"
import { countUsers } from '../repository/user/userRepository';


export default async function (params: any, context: any) {

  const {name, email, password} = params

  if(!name || !email || !password){
    context.status(400)
    return {
      "message": "All fields are required"
    }
  }


  const userTable = aircode.db.table('user')

  const userExist = await userTable
  .where({email})
  .findOne()

  if(userExist){
    context.status(409)
    return {
      "message": "User already exist"
    }
  }


  try{
  const count = await countUsers()

   const hashedPassword = await bcrypt.hash(password, 10)
   const newUser = {name, email, "password": hashedPassword, "isAdmin":false}

  if(count == 0){
    newUser.isAdmin = true
  }
    await userTable.save(newUser)

    const result = await userTable
    .where({email})
    .projection({password: 0, isAdmin: 0})
    .find()

    context.status(201)

    return {
      ...result
    }
  }catch(err:any){
    context.status(500)
    return {"message": err.message}
  }

};
