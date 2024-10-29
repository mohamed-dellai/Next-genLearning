import { addRequestedGifts } from "@/lib/homeQuerys";
import { NextResponse } from "next/server";

export async function POST(request){

    const user = request.cookies.get('user-id')?.value;
    const giftsId= await request.json()
    try{
        const res=await addRequestedGifts(user,giftsId)
        if(res)
            return NextResponse.json("succes",{status: 200})

    }
    catch(e){
        console.log(e)
        return NextResponse.json("error",{status: 500})
    }

}