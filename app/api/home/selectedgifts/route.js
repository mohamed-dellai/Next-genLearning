import { NextResponse } from "next/server"
import {getSelectedGifts} from "../../../../lib/homeQuerys"
export async function GET(request) {
    const user = request.cookies.get('user-id').value;

    try{
        const result= await getSelectedGifts(user)
        return NextResponse.json(result,{status: 200})
    }
    catch(error){
        console.log(error)
        return NextResponse.error("error fetching template")

    }
}