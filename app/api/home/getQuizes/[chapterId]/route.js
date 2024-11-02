import { NextResponse } from 'next/server';
import { getQuizes } from "../../../../../lib/homeQuerys";

export async function GET(req, res) {
  const { chapterId } = res.params;
  try{
    const quizes= await getQuizes(chapterId);
    return NextResponse.json(quizes,{status:200})
  }
  catch(e){
    console.log(e)
    return NextResponse.error("error")
  }
}