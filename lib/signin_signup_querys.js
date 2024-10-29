import {query}  from "./db";

export async function insertUser(email,password){
    
    let query_text="insert into users(password, email) values ($1,$2)"
    let values=[password,email]
    let result=await query(query_text,values)
    return result
}
export async function confirmMail(mail){
    let query_text="update users set confirmed=true where email=$1"
    let values=[mail]
    let result=await query(query_text,values)
    return result
}

export async function getUserByEmail(email) {
    
      const res = await query('SELECT * FROM users WHERE email = $1', [email]);
      return res.rows[0];

  }