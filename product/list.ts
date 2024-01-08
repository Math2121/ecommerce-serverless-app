// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';
import { countProduct, getAll } from '../repository/product/productRepository';

export default async function (params: any, context: any) {
  const count = await countProduct()
  const products = await getAll()

  return {
    count,
    products
  }
};
