import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secure_secret";

// 🟢 GET - Fetch User Data from Token
export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized: No token provided" }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const { id } = decodedToken as { id: number };

    // Fetch user details from database
    const user = await prisma.userSell.findUnique({
      where: { id },
      select: { username: true, email: true, phone: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, username: user.username, email: user.email, phone: user.phone });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// 🔵 POST - Update User Profile
export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized: No token provided" }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const { id } = decodedToken as { id: number };

    const body = await request.json();
    const { title, firstname, lastname, profileImage, contactInfo, address } = body;

    if (!title || !firstname || !lastname || !contactInfo || !address) {
      return NextResponse.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }

    const updatedProfile = await prisma.profileSell.upsert({
      where: { userId: id },
      update: { title, firstname, lastname, profileImage, contactInfo, address },
      create: { userId: id, title, firstname, lastname, profileImage, contactInfo, address },
    });

    return NextResponse.json({ success: true, message: "โปรไฟล์ได้รับการยืนยันแล้ว!", profile: updatedProfile }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/confirmprofilesell:", error);
    return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
