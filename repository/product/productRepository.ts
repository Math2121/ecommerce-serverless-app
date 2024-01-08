// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';

const productTable = aircode.db.table('product')

export async function saveProduct(params: any):Promise<void | null>{
  const productExist =  await productTable
  .where({title: params.title})
  .findOne()


  if(productExist === null){
    await productTable.save(params)
    return 
  };

  return null

}

export async function deleteProduct(_id: string): Promise<void>{
  const productExist = await productTable
  .where({_id})
  .findOne()

  await productTable.delete(productExist)

}

export async function countProduct():Promise<any>{
 const count = await productTable
    .where()
    .count() 

  return count
}


export async function getAll():Promise<any[]>{
 const products = await productTable.where().find()

return products
} 
export async function findProductByID(_id:string):Promise<any>{
 const product = await productTable
    .where({_id})
    .findOne() 

  return product
}

