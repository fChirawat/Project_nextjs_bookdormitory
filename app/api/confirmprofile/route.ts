import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();
export async function POST(req: Request) {
    try {
        // ✅ ตรวจสอบว่า Request มี `multipart/form-data` หรือไม่
        if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid Content-Type, must be multipart/form-data" }, { status: 400 });
        }

        // ✅ อ่าน `FormData`
        const formData = await req.formData();

        console.log("FormData Received:", formData);

        // 🔹 ดึงข้อมูลจาก `FormData`
        const userId = Number(formData.get("userId"));
        const title = formData.get("title") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const email = formData.get("email") as string;
        const address = formData.get("address") as string;
        const contactInfo = formData.get("contactInfo") as string;
        const status = formData.get("status") as string || "pending";

        if (!userId || !firstName || !lastName || !address || !title || !email || !phoneNumber || !contactInfo) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 🔹 ตรวจสอบและอัปโหลดไฟล์ภาพ
        let profileImage = "";

        const uploadImage = async (file: File, folder: string) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder },
                    (error, result) => {
                        if (error) {
                            console.error(`Failed to upload ${folder}:`, error);
                            reject(error);
                        } else {
                            resolve(result?.secure_url);
                        }
                    }
                ).end(buffer);
            });
        };

        const profileImageFile = formData.get("profileImage") as File;

        if (profileImageFile && profileImageFile.size > 0) {
            profileImage = await uploadImage(profileImageFile, "profile_pictures") as string;
        }

        // 🔹 บันทึกข้อมูลลงฐานข้อมูล
        const newProfile = await prisma.profileSell.create({
            data: {
                userId,
                title,
                firstName,
                lastName,
                phoneNumber,
                email,
                address,
                profileImage,
                status,
            },
        });

        console.log("Profile created successfully:", newProfile);
        return NextResponse.json(newProfile, { status: 201 });

    } catch (error) {
        console.error("Unexpected API Error:", error);
        return NextResponse.json({ error: "Failed to create profile", details: error.message }, { status: 500 });
    }
}
