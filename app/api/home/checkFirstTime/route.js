import { NextResponse } from "next/server";
import { getPereference } from "../../../../lib/homeQuerys";
export async function GET(request) {
    const user = request.cookies.get('user-id')?.value;
    try{
        const result= await getPereference(user)
        if(result.age>0 && result.gifts>0){
            return new NextResponse("filled",{status: 200})
        }
        if(result.gifts<=0 || result.gifts===undefined){
            return new NextResponse("giftsNotFilled",{status: 200})
        }
        return NextResponse.json("not filled",{status: 200})
    }
    catch(error){
        console.log(error)
        return new NextResponse.error("error getting pereference")

    }
}