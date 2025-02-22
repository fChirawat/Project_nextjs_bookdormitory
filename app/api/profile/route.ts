import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid Content-Type, must be multipart/form-data" }, { status: 400 });
        }

        const formData = await req.formData();

        // ✅ ดึงข้อมูลจาก `FormData`
        const userId = Number(formData.get("userId"));
        const title = formData.get("title")?.toString();
        const firstName = formData.get("firstName")?.toString();
        const lastName = formData.get("lastName")?.toString();
        const username = formData.get("username")?.toString();
        const phoneNumber = formData.get("phoneNumber")?.toString();
        const email = formData.get("email")?.toString();
        const address = formData.get("address")?.toString();
        const accountNumber = formData.get("accountNumber")?.toString();
        const status = formData.get("status")?.toString() || "pending";

        // ✅ ตรวจสอบค่าที่จำเป็น
        if (!userId || !firstName || !lastName || !address || !accountNumber) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // ✅ ฟังก์ชันอัปโหลดรูปภาพไปยัง Cloudinary
        const uploadImage = async (file: File, folder: string) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder, resource_type: "auto" },
                    (error, result) => {
                        if (error) {
                            console.error(`Upload ${folder} failed:`, error);
                            reject(error);
                        } else {
                            resolve(result?.secure_url ?? "");
                        }
                    }
                );
                uploadStream.end(buffer);
            });
        };

        // ✅ อัปโหลดรูปภาพ
        let profileImage = "";
        let photoIdCard = "";

        const profileImageFile = formData.get("profileImage") as File;
        const idCardImageFile = formData.get("photoIdCard") as File;

        if (profileImageFile && profileImageFile.size > 0) {
            profileImage = await uploadImage(profileImageFile, "profile_pictures");
        } else {
            return NextResponse.json({ error: "Profile image is required" }, { status: 400 });
        }

        if (idCardImageFile && idCardImageFile.size > 0) {
            photoIdCard = await uploadImage(idCardImageFile, "id_cards");
        } else {
            return NextResponse.json({ error: "ID Card image is required" }, { status: 400 });
        }

        // ✅ บันทึกข้อมูลลงฐานข้อมูล
        const newProfile = await prisma.profile.create({
            data: {
                userId,
                title,
                firstName,
                lastName,
                username,
                phoneNumber,
                email,
                address,
                accountNumber,
                profileImage,
                photoIdCard,
                status,
            },
        });

        await prisma.$disconnect();

        return NextResponse.json(newProfile, { status: 201 });
    } catch (error) {
        console.error("Unexpected API Error:", error);
        await prisma.$disconnect();
        return NextResponse.json({ error: "Failed to create profile", details: (error as Error).message }, { status: 500 });
    }
}
