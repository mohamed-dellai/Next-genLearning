import { NextResponse } from "next/server";
import { decrypt } from "@/lib/hashingWithKey";
import {confirmMail} from"../../../../lib/signin_signup_querys"
export function GET(request,response){
    
    var descyptedMail=decrypt(response.params.confimation.join('/'))
    try{
        let res=confirmMail(descyptedMail);
        return NextResponse.redirect('http://localhost:3000/success');
    }
    catch(err){
        return NextResponse.redirect('http://localhost:3000/error');
    }
    
}