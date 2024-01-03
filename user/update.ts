// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import verifyToken from '../middleware/verifyToken';
import { findUserByID, saveUser } from '../repository/user/userRepository';

export default async function (params: any, context: any) {
  const token = await verifyToken(context)

 
  const {name} = params
  const user = await findUserByID(token?._id ?? '')

  user.name = name
  try{
    await saveUser(user);
    context.status(201)
    return {
      ...user
    }
  }catch{
    context.status(500)
    return {
      "message": "User not updated"
    }
  }

};
