import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const roomId = parseInt(params.id);
    if (isNaN(roomId)) {
      return NextResponse.json({ error: "รหัสห้องไม่ถูกต้อง" }, { status: 400 });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        seller: { select: { nameroom: true, photoMain: true } }, // ดึงข้อมูลหอพักที่เกี่ยวข้อง
      },
    });

    if (!room) {
      return NextResponse.json({ error: "ไม่พบข้อมูลห้องพัก" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
