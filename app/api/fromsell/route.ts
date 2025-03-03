import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

// Initialize Prisma Client
const prisma = new PrismaClient();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// ✅ GET method: ดึงข้อมูลผู้ใช้
export async function GET(req: Request) {
  try {
    const cookies = req.headers.get("cookie");
    const token = cookies
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "ไม่พบ Token" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Token ไม่ถูกต้องหรือหมดอายุ" },
        { status: 401 }
      );
    }

    const user = await prisma.profileSell.findUnique({
      where: { userId: decoded.id },
      select: {
        userId: true,
        title: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        email: true,
        bank: true,
        accountNumber: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "ไม่พบผู้ใช้ในระบบ" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}