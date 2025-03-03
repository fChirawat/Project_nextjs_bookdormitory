import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const dormId = parseInt(params.id);
    if (isNaN(dormId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // ✅ ดึงเฉพาะห้องที่มีอยู่จริงตาม dormId
    const rooms = await prisma.room.findMany({
      where: { dormId: dormId }, 
      select: {
        id: true,
        roomNumber: true,
        isAvailable: true,
      },
    });

    // ถ้าไม่มีห้องเลย
    if (!rooms.length) {
      return NextResponse.json({ message: "ไม่มีข้อมูลห้องพัก" }, { status: 404 });
    }

    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
