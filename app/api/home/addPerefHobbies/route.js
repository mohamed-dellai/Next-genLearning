import { NextResponse } from "next/server";
import { addHobbies, addPeref, addAge, addName } from "../../../../lib/homeQuerys";

export async function POST(request) {
    try {
        const data = await request.json();
        const user = request.cookies.get('user-id')?.value;

        if (!user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const { hobbies, peref, age, name } = data;

        const hobbiesResult = await addHobbies(hobbies, user);
        const perefResult = await addPeref(peref, user);
        const ageResult = await addAge(age, user);
        const nameResult = await addName(name, user);

        return NextResponse.json({
            result: "success",
            data: {
                hobbies: hobbiesResult,
                preferences: perefResult,
                age: ageResult,
                name: nameResult,
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
    }
}
