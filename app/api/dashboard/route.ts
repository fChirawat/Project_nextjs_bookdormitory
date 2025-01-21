import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// สร้างการเชื่อมต่อกับฐานข้อมูล
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    try {
      // Query ข้อมูลจากฐานข้อมูลโดยใช้ Prisma
      const totalUsers = await prisma.user.count();
      const totalLoginUsers = await prisma.user.count(); // สมมติข้อมูลอยู่ในตาราง User
      const totalSellers = await prisma.userSell.count(); // สมมติข้อมูลอยู่ในตาราง UserSell

      // ส่งข้อมูลกลับไปยัง client
      res.status(200).json({
        totalUsers,
        totalLoginUsers,
        totalSellers,
      });
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // กรณี method อื่นที่ไม่ใช่ GET
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
