import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();  // Instantiate Prisma Client

export async function GET(req: Request) {
  try {
    // Fetch dormitories from the database
    const dormitories = await prisma.formSell.findMany({
      select: {
        id: true,
        nameDormitory: true,
        typeDormitory: true,
        addressDormitory: true,
        dormitoryDetails: true,
        facilities: true,
        roomNumber: true,
        distanceDormitory: true,
        roomDeposit: true,
        priceMonth: true,
        priceElectricity: true,
        priceWater: true,
        priceWifi: true,
        priceOther: true,
        photoDormitory: true,
      },
    });

    // If no dormitories found, return 404
    if (!dormitories || dormitories.length === 0) {
      return NextResponse.json(
        { success: false, message: 'ไม่พบข้อมูลหอพัก' },
        { status: 404 }
      );
    }

    // Return dormitory data if found
    return NextResponse.json({ success: true, dormitories }, { status: 200 });
  } catch (error) {
    // Log the error and return a 500 status if something goes wrong
    console.error('Error fetching dormitory data:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' },
      { status: 500 }
    );
  } finally {
    // Close the Prisma client connection after the operation is complete
    await prisma.$disconnect();
  }
}
