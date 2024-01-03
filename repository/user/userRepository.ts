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
export async function findUserByID(_id:string):Promise<any>{
 const user = await userTable
    .where({_id})
    .projection({isAdmin:0, password: 0, accessToken: 0})
    .findOne() 

  return user
}


export async function saveUser(current: any):Promise<void>{
  await userTable.save(current)

}

export async function deleteUser(id:string):Promise<void>{
 const user = await userTable
    .where({_id:id})
    .findOne() 
 await userTable.delete(user)

}






