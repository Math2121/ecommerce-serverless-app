// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import verifyToken from '../middleware/verifyToken';
import { deleteUser } from '../repository/user/userRepository';

export default async function (params: any, context: any) {

const token = await verifyToken(context)

  if(token == null){
    context.status(409)
    return {
      "message": "Token is invalid"
    }
  }

  try{
    await deleteUser(token._id)
    context.status(204)
    return {
      "message": "User deleted"
    }
  }catch(err:any){
    context.status(500)
    return {
      "message": "Error internal"
    }
  }

};
