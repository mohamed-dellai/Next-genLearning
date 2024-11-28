import { NextResponse } from "next/server";  // Correct import for server response
import { cookies } from "next/headers";      // Import cookies function
import { getAllChaptersIds } from "@/lib/homeQuerys";
export async function GET(req, { params }) {
    // Access cookies using the cookies object
    
    const { courseId } = params;  // Access route parameter directly from 'params'
        try {
         const userCookie = cookies().get('user-id');
         const user =userCookie.value ;
        // Replace this with the actual function to get chapters using `user` and `courseId`
        const chapters = await getAllChaptersIds(user, courseId[0]);  
        return NextResponse.json(chapters);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve chapters' }, { status: 500 });
    }
}
