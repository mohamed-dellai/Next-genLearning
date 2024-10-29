import { NextResponse } from 'next/server';
import { getQuizes } from '../../../../lib/homeQuerys';

export async function GET(req, res) {
  const { chapterid } = res.params;
  console.log("gere")
  console.log(chapterid)

}