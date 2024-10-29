import { NextResponse } from "next/server"
import {getSelectedGifts} from "../../../../lib/homeQuerys"
export async function GET(request) {
    try{
        const result= await getSelectedGifts()
        return NextResponse.json(result,{status: 200})
    }
    catch(error){
        console.log(error)
        return NextResponse.error("error fetching template")

    }
}