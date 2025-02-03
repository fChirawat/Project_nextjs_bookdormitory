import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received request body:", body);

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }

        let {
            userId, title, firstName, lastName, username,
            phoneNumber, email, address, bank, accountNumber,
            profileImage, photoIdCard, status
        } = body;

        // ✅ Convert userId to number (Prisma expects an integer)
        userId = Number(userId);
        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
        }

        // ✅ Ensure required fields are present
        if (!userId || !firstName || !lastName || !address || !photoIdCard) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // ✅ Default missing fields to empty string
        title = title || "";
        username = username || "";
        phoneNumber = phoneNumber || "";
        email = email || "";
        bank = bank || "";
        accountNumber = accountNumber || "";
        profileImage = profileImage || "";
        photoIdCard = photoIdCard || "";
        status = status || "pending"; // Default status

        // 🔹 Save to MySQL (Prisma)
        try {
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
                    photoIdCard,
                    status,
                },
            });

            console.log("Database Insert Success:", newProfile);
            return NextResponse.json(newProfile, { status: 201 });

        } catch (dbError) {
            console.error("Database Insert Error:", dbError);
            return NextResponse.json({ error: "Failed to save profile", details: dbError.message }, { status: 500 });
        }

    } catch (error) {
        console.error("Unexpected API Error:", error);
        return NextResponse.json({ error: "Failed to create profile", details: error.message }, { status: 500 });
    }
}
