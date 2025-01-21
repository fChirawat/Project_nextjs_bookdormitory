export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = "your_secret_key"; // ใช้ secret ที่ปลอดภัย

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // ตรวจสอบว่ามี username และ password
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" },
        { status: 400 }
      );
    }

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "ไม่พบชื่อผู้ใช้นี้ในระบบ" },
        { status: 404 }
      );
    }

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload
      JWT_SECRET, // Secret Key
      { expiresIn: "1h" } // หมดอายุใน 1 ชั่วโมง
    );

    // ตั้งค่า Cookie
    const response = NextResponse.json(
      { success: true, message: "เข้าสู่ระบบสำเร็จ!" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true, // ป้องกันการเข้าถึงจาก JavaScript ฝั่ง client
      secure: process.env.NODE_ENV === "production", // ใช้ secure เฉพาะใน production
      sameSite: "strict", // ป้องกัน CSRF
      maxAge: 3600, // อายุ Cookie (1 ชั่วโมง)
    });

    return response;
  } catch (error) {
    console.error("Error in /api/login:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
