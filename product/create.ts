// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import verifyToken from '../middleware/verifyToken';
import { saveProduct } from '../repository/product/productRepository';

export default async function (params: any, context: any) {
  const tokenUser = await verifyToken(context)

  if(!tokenUser || !tokenUser?.isAdmin){
    context.status(422)
    return {
      "message": "User is not allowed"
    }
  }

  const {title, description, inStock,category,price,color,size} = params

  if(!title || !description || !price){
    context.status(400)
    return {
      "message":"Missing mandatory attributes"
    }
  }


  try{
    const result = await saveProduct(params)
    
    if(!result){
      context.status(422)
      return {
      "message":"Product already exist"
      }
   }

    context.status(201)
    return {
      "message":"Product created"
    }
  }catch(err:any){
    context.status(500)
    return {
      "message":"Internal error"
    }
  }
};
