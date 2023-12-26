// @see https://docs.aircode.io/guide/functions/
import aircode from 'aircode';

const userTable = aircode.db.table('user')

export async function countUsers():Promise<any>{
 const count = await userTable
    .where()
    .count() 

  return count
}

export async function findUserByEmail(email:string):Promise<any>{
 const user = await userTable
    .where({email})
    .findOne() 

  return user
}

export async function saveUser(current: any):Promise<any>{
  await userTable.save(current)

}



