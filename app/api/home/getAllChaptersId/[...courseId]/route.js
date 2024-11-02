import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default async function GET(req,res){
    const user = request.cookies.get('user-id').value;
    const { courseId } = res.params;
    console.log(res.params)

    try{
        const res=getAllChaptersIds(user,courseId)
        NextResponse.json(res)
    }
    catch(error){
        NextResponse.error(error)
    }
}