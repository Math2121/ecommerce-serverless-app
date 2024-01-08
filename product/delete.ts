// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import verifyToken from '../middleware/verifyToken';
import { deleteProduct } from '../repository/product/productRepository';

export default async function (params: any, context: any) {

  const tokenUser = await verifyToken(context)

  if(!tokenUser || !tokenUser?.isAdmin){
    context.status(422)
    return {
      "message": "User is not allowed"
    }
  }


  const {_id} = params

  try{
    await deleteProduct(_id)
    context.status(204)
    return {
      "message": "Product deleted"
    }
  }catch(err:any){
    context.status(500)
    return {
      "message": err.message
    }
  }
  
};
