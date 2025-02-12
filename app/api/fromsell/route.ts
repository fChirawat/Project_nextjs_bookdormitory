import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary"; // Cloudinary setup
import jwt from "jsonwebtoken";

// Initialize Prisma Client
const prisma = new PrismaClient();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// GET method to retrieve user data using JWT authentication
export async function GET(req: Request) {
  try {
    // Extract token from cookies
    const cookies = req.headers.get("cookie");
    const token = cookies
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // If token is not found, return unauthorized error
    if (!token) {
      return NextResponse.json(
        { success: false, message: "ไม่พบ Token" },
        { status: 401 }
      );
    }

    // Verify token and decode the user ID
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Token ไม่ถูกต้องหรือหมดอายุ" },
        { status: 401 }
      );
    }

    // Retrieve user data from the database
    const user = await prisma.profileSell.findUnique({
      where: { userId: decoded.id },
      select: {
        userId: true,
        title: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        email: true,
      },
    });

    // If user not found, return error
    if (!user) {
      return NextResponse.json(
        { success: false, message: "ไม่พบผู้ใช้ในระบบ" },
        { status: 404 }
      );
    }

    // Return user data in response
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // ✅ ตรวจสอบว่า Request มี `multipart/form-data` หรือไม่
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type, must be multipart/form-data" },
        { status: 400 }
      );
    }

    // ✅ อ่าน `FormData`
    const formData = await req.formData();
    console.log("FormData Received");

    // 🔹 ดึงข้อมูลจาก `FormData`
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const email = formData.get("email") as string;
    const priceOther = formData.get("priceOther") as string;
    const priceWifi = formData.get("priceWifi") as string;
    const priceWater = formData.get("priceWater") as string;
    const priceElectricity = formData.get("priceElectricity") as string;
    const roomDeposit = formData.get("roomDeposit") as string;
    const roomNumber = formData.get("roomNumber") as string;
    const facilitiesDormitory = formData.get("facilitiesDormitory") as string;
    const dormitoryDetails = formData.get("dormitoryDetails") as string;
    const addressDormitory = formData.get("addressDormitory") as string;
    const typeDormitory = formData.get("typeDormitory") as string;
    const nameDormitory = formData.get("nameDormitory") as string;
    const photoDormitory = formData.get("photoDormitory") as File;

    // 🔹 ตรวจสอบค่าที่จำเป็น
    if (
      !title ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !roomDeposit ||
      !roomNumber ||
      !addressDormitory ||
      !nameDormitory ||
      !photoDormitory
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 🔹 ฟังก์ชันอัปโหลดภาพ
    const uploadImage = async (file: File, folder: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) {
              console.error(`Failed to upload image to ${folder}:`, error);
              reject("Image upload failed");
            } else {
              resolve(result?.secure_url || '');
            }
          }
        ).end(buffer);
      });
    };

    // 🔹 อัปโหลดภาพของหอพัก
    let photoUrl = "";
    if (photoDormitory && photoDormitory.size > 0) {
      try {
        photoUrl = await uploadImage(photoDormitory, "dormitory_photos");
      } catch (uploadError) {
        return NextResponse.json({ error: "Failed to upload dormitory photo" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Dormitory photo is required" }, { status: 400 });
    }

    // 🔹 บันทึกข้อมูลลงฐานข้อมูล
    const newDormitory = await prisma.dormitory.create({
      data: {
        title,
        firstName,
        lastName,
        phoneNumber,
        email,
        priceOther,
        priceWifi,
        priceWater,
        priceElectricity,
        roomDeposit,
        roomNumber,
        facilitiesDormitory,
        dormitoryDetails,
        addressDormitory,
        typeDormitory,
        nameDormitory,
        photoDormitory: photoUrl,
      },
    });

    console.log("Dormitory profile created successfully");

    // 🔹 ส่งข้อมูลกลับ
    return NextResponse.json(newDormitory, { status: 201 });
  } catch (error) {
    console.error("Unexpected API Error:", error);
    return NextResponse.json({ error: "Failed to create dormitory profile", details: error.message }, { status: 500 });
  }
}
