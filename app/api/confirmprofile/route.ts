import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 🔐 ดึงค่า JWT Secret Key จากตัวแปรแวดล้อม
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('❌ JWT_SECRET_KEY is missing in environment variables!');
}

export async function POST(req: NextRequest) {
  try {
    // ✅ ดึง Token จาก Header และตรวจสอบว่าไม่ได้ว่างเปล่า
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '❌ Missing or invalid token, please login.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // ✅ ตรวจสอบความถูกต้องของ Token
    const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default-secret-key';

        if (!SECRET_KEY) {
           throw new Error('🚨 SECRET_KEY is missing. Please set JWT_SECRET_KEY in your environment variables.');
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("🔐 Token decoded:", decoded);

    // ✅ ดึงข้อมูลจาก Request Body
    const body = await req.json();
    const { title, firstname, lastname, email, phoneNumber, contactInfo, address, profileImage } = body;

    // ✅ เช็คว่าได้รับค่าที่จำเป็นหรือไม่
    if (!firstname || !lastname || !email) {
      return NextResponse.json({ error: '❌ Missing required fields.' }, { status: 400 });
    }

    console.log("📦 Received Data:", body);

    // 🔗 ถ้ามีการบันทึกลงฐานข้อมูล MongoDB หรืออื่นๆ สามารถเพิ่มตรงนี้ได้
    // Example: await db.collection('profiles').insertOne({ title, firstname, lastname, email, phoneNumber, contactInfo, address, profileImage });

    return NextResponse.json({ message: '✅ Profile successfully saved!', data: body }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Error:", error);

    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: '❌ Invalid token, please login again.' }, { status: 401 });
    }

    return NextResponse.json({ error: '❌ Internal Server Error' }, { status: 500 });
  }
}