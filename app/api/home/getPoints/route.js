import { NextResponse } from 'next/server';
import {getPoints} from '../../../../lib/homeQuerys'
export async function GET(request){

    const user = request.cookies.get('user-id').value;
    try{
        const res=await getPoints(user)
        return NextResponse.json(res,{status:200})
    }
    catch(err){
        return NextResponse.json({data:"error"},{status:500})
    }
}