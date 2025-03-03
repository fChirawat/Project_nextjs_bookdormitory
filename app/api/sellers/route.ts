import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

// 📌 ฟังก์ชันอัปโหลดรูปไปยัง Cloudinary
const uploadImage = async (file: File, folder: string) => {
    if (!file || !(file instanceof File) || file.size === 0) {
        return "";
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
                } else {
                    console.log(`✅ ${folder} uploaded successfully:`, result.secure_url);
                    resolve(result.secure_url);
                }
            }
        ).end(buffer);
    });
};

// 📌 API POST Handler
export async function POST(req: Request) {
    try {
        console.log("📌 API Called: /api/sellers");

        if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid Content-Type, must be multipart/form-data" }, { status: 400 });
        }

        const formData = await req.formData();
        console.log("📌 FormData Received");

        // ✅ ตรวจสอบค่าที่ได้รับจาก FormData
        const userId = formData.get("userId") ? Number(formData.get("userId")) : null;
        const title = formData.get("title")?.toString() || "";
        const firstName = formData.get("firstName")?.toString() || "";
        const lastName = formData.get("lastName")?.toString() || "";
        const phoneNumber = formData.get("phoneNumber")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const bank = formData.get("bank")?.toString() || "";
        const accountNumber = formData.get("accountNumber")?.toString() || "";
        const nameroom = formData.get("nameroom")?.toString() || "";
        const addressDormitory = formData.get("addressDormitory")?.toString() || "";
        const distance = formData.get("distance")?.toString() || "";

        if (!userId || !firstName || !lastName || !phoneNumber || !email || !nameroom || !addressDormitory|| !distance) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // ✅ อัปโหลดรูปโปรไฟล์
        const photoMainFile = formData.get("photoMain");
        const photoMain = photoMainFile instanceof File && photoMainFile.size > 0 
            ? await uploadImage(photoMainFile, "profile_pictures") 
            : "";

        // ✅ บันทึกข้อมูล `Seller`
        const newSeller = await prisma.seller.create({
            data: {
                userId,
                title,
                firstName,
                lastName,
                phoneNumber,
                email,
                bank,
                accountNumber,
                nameroom,
                addressDormitory,
                distance,
                photoMain,
            },
        });

        console.log("✅ Seller created successfully:", newSeller);

        // ✅ ดึงจำนวนห้องพัก
        const totalRooms = formData.get("totalRooms") ? Number(formData.get("totalRooms")) : 0;

        for (let i = 1; i <= totalRooms; i++) {
            const roomNumber = formData.get(`roomNumber_${i}`)?.toString() || null;     //เลขห้อง
            const roomDetail = formData.get(`roomDetail_${i}`)?.toString() || null;     //รายละเอียด
            const roomPrice = formData.get(`roomPrice_${i}`) ? Number(formData.get(`roomPrice_${i}`)) : 0;    //ราคาห้อง/เดือน
            const deposit = formData.get(`deposit_${i}`) ? Number(formData.get(`deposit_${i}`)) : 0;    //ค่ามัดจำห้อง
            const electricityCost = formData.get(`electricityCost_${i}`) ? Number(formData.get(`electricityCost_${i}`)) : 0; //ค่าไฟ
            const waterCost = formData.get(`waterCost_${i}`) ? Number(formData.get(`waterCost_${i}`)) : 0;  //ค่าน้ำ
            const anotherCost = formData.get(`anotherCost_${i}`) ? Number(formData.get(`anotherCost_${i}`)) : 0; //ค่าอื่นๆ
            const amenities = formData.get(`amenities_${i}`)?.toString() || ""; //สิ่งอำนวยความสะดวก
            const roomType = formData.get(`roomType_${i}`)?.toString() || "";   //ประเภทห้อง

            if (!roomNumber || !roomDetail || !roomPrice || !deposit || !electricityCost || !waterCost || !anotherCost || !amenities || !roomType) {
                console.warn(`⚠️ Missing room details for room ${i}, skipping...`);
                continue;
            }

            const roomPhotoFile = formData.get(`roomPhoto_${i}`);
            const roomPhoto = roomPhotoFile instanceof File && roomPhotoFile.size > 0 
                ? await uploadImage(roomPhotoFile, "room_photos") 
                : "";

            await prisma.room.create({
                data: {
                    sellerId: newSeller.id,
                    roomNumber,
                    roomDetail,
                    roomType,
                    amenities,
                    deposit,
                    electricityCost,
                    waterCost,
                    roomPrice,
                    anotherCost,
                    photoDormitory: roomPhoto,
                },
            });

            console.log(`✅ Room ${roomNumber} added successfully`);
        }

        return NextResponse.json({ message: "Seller created successfully", seller: newSeller }, { status: 201 });

    } catch (error) {
        console.error("❌ Unexpected API Error:", error);
        return NextResponse.json({ error: "Failed to create seller", details: error.message }, { status: 500 });
    }
}