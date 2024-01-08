// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import verifyToken from '../middleware/verifyToken';
import { findProductByID, saveProduct } from '../repository/product/productRepository';

export default async function (params: any, context: any) {
  
  const tokenUser = await verifyToken(context)
   if(!tokenUser || !tokenUser?.isAdmin){
    context.status(422)
    return {
      "message": "User is not allowed"
    }
  }

  const {_id, title, description, inStock,category,price,color, size} = params

    try{
    const product = await findProductByID(_id)
      
    
    if(product === null){
      context.status(422)
      return {
      "message":"Product not exist"
      }
   }
    await saveProduct(params)
    context.status(201)
    return {
      "message":"Product updated"
    }
  }catch(err:any){
    context.status(500)
    return {
      "message":"Internal error"
    }
  }
};
