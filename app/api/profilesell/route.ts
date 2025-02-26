import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

// ✅ Add the `uploadImage` function before using it
const uploadImage = async (file: File, folder: string) => {
    try {
        if (!file || !(file instanceof File) || file.size === 0) {
            throw new Error(`Invalid file provided for ${folder}`);
        }

        console.log(`📌 Uploading ${folder} image...`);

        const buffer = Buffer.from(await file.arrayBuffer());

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) {
                        console.error(`❌ Failed to upload ${folder}:`, error);
                        reject(new Error(`Cloudinary upload failed for ${folder}`));
                    } else if (!result?.secure_url) {
                        reject(new Error(`Cloudinary did not return a valid URL for ${folder}`));
                    } else {
                        console.log(`✅ ${folder} uploaded successfully:`, result.secure_url);
                        resolve(result.secure_url);
                    }
                }
            ).end(buffer);
        });
    } catch (error) {
        console.error(`❌ Upload failed for ${folder}:`, error);
        throw new Error(`File upload error for ${folder}`);
    }
};

// ✅ API POST handler
export async function POST(req: Request) {
    try {
        console.log("📌 API Called: /api/profilesell");

        if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid Content-Type, must be multipart/form-data" }, { status: 400 });
        }

        const formData = await req.formData();
        console.log("📌 FormData Received:", formData);

        const userId = Number(formData.get("userId"));
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const title = formData.get("title") as string;
        const username = formData.get("username") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const email = formData.get("email") as string;
        const accountNumber = formData.get("accountNumber") as string;
        const bank = formData.get("bank") as string;
        const address = formData.get("address") as string;


        if (!userId || !firstName || !lastName || !address) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const profileImageFile = formData.get("profileImage");
        const idCardImageFile = formData.get("photoIdCard");

        console.log("📌 profileImageFile:", profileImageFile);
        console.log("📌 idCardImageFile:", idCardImageFile);

        if (!profileImageFile || !(profileImageFile instanceof File) || profileImageFile.size === 0) {
            return NextResponse.json({ error: "Profile image is required and must be a valid file" }, { status: 400 });
        }

        if (!idCardImageFile || !(idCardImageFile instanceof File) || idCardImageFile.size === 0) {
            return NextResponse.json({ error: "ID Card image is required and must be a valid file" }, { status: 400 });
        }

        // ✅ Upload images to Cloudinary
        const profileImage = await uploadImage(profileImageFile, "profile_pictures");
        console.log("📌 Profile Image Uploaded:", profileImage);

        const photoIdCard = await uploadImage(idCardImageFile, "id_cards");
        console.log("📌 ID Card Image Uploaded:", photoIdCard);

        // ✅ Save to Prisma database
        const newProfile = await prisma.profileSell.create({
            data: {
                userId,
                title,
                firstName,
                lastName,
                username,
                phoneNumber,
                email,
                address,
                bank,
                accountNumber,
                profileImage,
                photoIdCard
            },
        });

        console.log("✅ Profile created successfully:", newProfile);

        return NextResponse.json(newProfile, { status: 201 });
    } catch (error) {
        console.error("❌ Unexpected API Error:", error);
        return NextResponse.json({ error: "Failed to create profile", details: error.message }, { status: 500 });
    }
}
