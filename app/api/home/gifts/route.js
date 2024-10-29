import { NextResponse } from "next/server";
import {getGiftTemplates, postGift} from "../../../../lib/homeQuerys";

export async function GET(request) {
    try{
        const result= await getGiftTemplates()
        return NextResponse.json(result,{status: 200})
    }
    catch(error){
        console.log(error)
        return NextResponse.error("error fetching template")

    }
}

export async function POST(request){
    const user = request.cookies.get('user-id')?.value;
    const data=await request.json();
    try{
        const result= await postGift(data,user)
        return NextResponse.json(result,{status: 200})
    }
    catch(error){
        console.log(error)
        return NextResponse.error("error adding gifts")

    }
}