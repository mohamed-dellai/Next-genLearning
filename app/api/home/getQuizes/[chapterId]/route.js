import { NextResponse } from 'next/server';
import { getQuizes } from "../../../../../lib/homeQuerys";
import { cookies } from "next/headers";      // Import cookies function

export async function GET(req, res) {
  const { chapterId } = res.params;
  const userCookie = cookies().get('user-id');

  const userId = userCookie.value;
  try{
    const quizes= await getQuizes(chapterId ,userId);
    return NextResponse.json(quizes,{status:200})
  }
  catch(e){
    console.log(e)
    return NextResponse.error("error")
  }
}