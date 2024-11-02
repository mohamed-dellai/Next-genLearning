"use client"
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';
export default function ReadingFlow(){
    const router = useRouter();
    const { id } = router.query;
    const[currentChapter,setCurrentChapter]=useState(null)
    const getAllChapters=async()=>{
        try{
            const result=axios.get(`/api/home/getAllChaptersId/${id}`)
            console.log(result.data)
        }
        catch(e){
            console.log(e)
        }
    }
    return(
        <></>
    )
}