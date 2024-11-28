import { NextResponse } from "next/server";
import { getChapterData } from "../../../../lib/homeQuerys";

export async function GET(req) {
  const { searchParams } = new URL(req.nextUrl); 
  const num = searchParams.get('num');    
  const course = searchParams.get('course');  
  
  try {
    const chapter = await getChapterData(course, num );
    
    return NextResponse.json(chapter);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
