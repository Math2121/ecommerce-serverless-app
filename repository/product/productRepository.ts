// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';

const productTable = aircode.db.table('product')

export async function saveProduct(params: any):Promise<void | null>{
  const productExist = await productTable
  .where({title: params.title})
  .findOne()

  if(!productExist) return null;

  await productTable.save(params)

}