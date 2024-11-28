import { NextResponse } from "next/server";
import { postAnswer } from "@/lib/homeQuerys";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { id, answer } = await request.json();

        const userCookie = cookies().get('user-id');

        const userId = userCookie.value;
        const result = await postAnswer(id, answer, userId);
        console.log(result)
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error("Error posting answer:", error);
        return NextResponse.json({ success: false, message: "Failed to post answer", error: error.message }, { status: 500 });
    }
}
