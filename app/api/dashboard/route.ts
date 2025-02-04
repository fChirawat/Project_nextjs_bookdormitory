import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    const userSells = await prisma.userSell.findMany();

    // รวม users และ userSells
    const allUsers = [...users, ...userSells];

    const totalUsers = allUsers.length;
    const totalLoginUsers = users.length; // หรือจะใช้วิธีการอื่นในการนับ users ที่ล็อกอิน
    const totalSellers = userSells.length;

    return NextResponse.json({
      totalUsers,
      totalLoginUsers,
      totalSellers,
      users: allUsers, // ส่งข้อมูลรวมทั้งหมด
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
