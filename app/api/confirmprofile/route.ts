import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // ✅ ตรวจสอบ Content-Type
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type, must be multipart/form-data" },
        { status: 400 }
      );
    }

    // ✅ อ่าน FormData
    const formData = await req.formData();
    const userId = Number(formData.get("userId"));
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const address = formData.get("address") as string;

    if (!userId || !firstName || !lastName || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 🔹 Upload images
    const uploadImage = async (file: File, folder: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url || "");
          }
        ).end(buffer);
      });
    };

    let profileImage = "";
    let photoIdCard = "";

    const profileImageFile = formData.get("profileImage") as File;
    const idCardImageFile = formData.get("photoIdCard") as File;

    if (profileImageFile && profileImageFile.size > 0) {
      profileImage = await uploadImage(profileImageFile, "profile_pictures");
    }

    if (idCardImageFile && idCardImageFile.size > 0) {
      photoIdCard = await uploadImage(idCardImageFile, "id_cards");
    } else {
      return NextResponse.json({ error: "ID Card image is required" }, { status: 400 });
    }

    // 🔹 บันทึกลงฐานข้อมูล
    const newProfile = await prisma.profileSell.create({
      data: {
        userId,
        firstName,
        lastName,
        address,
        profileImage,
        photoIdCard,
        status: "pending",
      },
    });

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error: any) {
    console.error("🔥 Error:", error);

    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "❌ Invalid token, please login again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "❌ Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
