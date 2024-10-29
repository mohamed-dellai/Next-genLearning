import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/signin_signup_querys";
import { generateToken } from '../../../lib/jwt';

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.email || !data.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await getUserByEmail(data.email);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = data.password===user.password;
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (!user.confirmed) {
        return NextResponse.json({ error: "Email not confirmed" }, { status: 401 });
      }
    const token = await generateToken(user);
    console.log(token)
    return NextResponse.json({ token }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
