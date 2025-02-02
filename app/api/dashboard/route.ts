import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    const totalUsers = users.length;
    const totalLoginUsers = users.filter((user) => user.isLoggedIn).length;
    const totalSellers = users.filter((user) => user.role === "seller").length;

    return NextResponse.json({ totalUsers, totalLoginUsers, totalSellers, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
