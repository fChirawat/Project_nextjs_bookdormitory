import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ดึงข้อมูลหอพักและห้องพักตาม id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const dormId = parseInt(params.id);

    const dorm = await prisma.seller.findUnique({
      where: { id: dormId },
      include: {
        rooms: true, // ดึงข้อมูลห้องพักทั้งหมดที่เชื่อมโยงกับหอพักนี้
      },
    });

    if (!dorm) {
      return NextResponse.json({ error: "ไม่พบข้อมูลหอพัก" }, { status: 404 });
    }

    return NextResponse.json(dorm);
  } catch (error) {
    console.error("Error fetching dormitory:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
