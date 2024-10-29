// app/api/your-route/route.js
import { NextResponse } from 'next/server';
import { sendMail } from '../../../lib/mailer';
import { encrypt } from '../../../lib/hashingWithKey';
import { insertUser } from '../../../lib/signin_signup_querys'; // Import your existing insertUser function

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    try {
      // Call the existing insertUser function
      const user = await insertUser(email, password);

      // Encrypt the email to create a token
      const token = encrypt(email, process.env.KEY || 'default_key');
      const confirmationLink = `http://localhost:3000/api/signup/${token}`;

      // Send a confirmation email
      await sendMail(email, 'Confirmation', confirmationLink);

      return NextResponse.json({ result: 'User registered successfully' }, { status: 200 });
    } catch (error) {
      console.error('Database Error:', error);
      return NextResponse.json({ error: 'User already exists or database error' }, { status: 500 });
    }

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
