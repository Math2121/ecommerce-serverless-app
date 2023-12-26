// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import verifyToken from '../middleware/verifyToken';

export default async function (params: any, context: any) {

  const token = await verifyToken(context)

  if(token == null){
    context.status(409)
    return {
      "message": "Token is invalid"
    }
  }

};
