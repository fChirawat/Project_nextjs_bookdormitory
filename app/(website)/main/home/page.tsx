import Link from "next/link";
import NavHome from "@/components/NavHome";
import { prisma } from "@/lib/prisma"; // ใช้ Prisma จาก lib แทนสร้างใหม่

// ดึงข้อมูลจากฐานข้อมูล
async function getDorms() {
  return await prisma.seller.findMany({
    select: {
      id: true,
      nameroom: true,
      addressDormitory: true,
      distance: true,
      photoMain: true,
    },
  });
}

// Card Component
const Card = ({ id, photoMain, nameroom, distance, addressDormitory }: 
  { id: number; photoMain: string; nameroom: string; distance: string; addressDormitory: string }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row w-full max-w-4xl mx-auto mb-6">
      <div className="flex w-full md:w-1/3 mb-4 md:mb-0">
        <div className="flex flex-col items-center w-full border border-gray-300 rounded-lg p-2">
          <img
            src={photoMain || "/default-image.jpg"}
            alt="Main Dormitory"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="flex-1 ml-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">ชื่อหอพัก: {nameroom}</h3>
          <p className="text-sm text-gray-600 mb-4">ห่างจากมหาวิทยาลัย: {distance} กม.</p>
          <p className="text-sm text-gray-600 mb-4">รายละเอียดหอพัก: {addressDormitory} </p>
        </div>

        <div className="flex flex-col items-end space-y-2 mt-6">
          {/* ✅ ลิงก์ไปยังหน้ารายละเอียดของหอพักแต่ละแห่ง */}
          <Link href={`/main/dormitory_book/${id}`} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow w-40 text-center">
            รายละเอียด
          </Link>
          <Link href="/main/book_dormitory" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow w-40 text-center">
            จองหอพัก
          </Link>
        </div>
      </div>
    </div>
  );
};


// Home Component
export default async function Home() {
  const dorms = await getDorms();

  return (
    <>
      <NavHome />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">รายการหอพัก</h1>

        {dorms.length > 0 ? (
          dorms.map((dorm) => (
            <Card
              key={dorm.id}
              id={dorm.id}  // ✅ เพิ่ม id เพื่อส่งไปยังหน้า /main/dormitory_book/[id]
              photoMain={dorm.photoMain}
              nameroom={dorm.nameroom}
              distance={dorm.distance}
              addressDormitory={dorm.addressDormitory}
            />
          ))
        ) : (
          <p>ไม่มีข้อมูลหอพัก</p>
        )}
      </div>
    </>
  );
}
