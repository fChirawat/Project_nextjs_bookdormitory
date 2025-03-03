"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Room {
  id: number;
  roomNumber: string;
  roomPrice: number;
  waterCost: string;
  electricityCost: string;
  deposit: string;
  otherFees: string;
  amenities: string;
  seller: {
    nameroom: string;
    photoMain: string;
  };
}

export default function DormitoryDetailPage() {
  const params = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    console.log("roomId:", params.id); // 🛠 เช็คค่าที่ได้รับ
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${params.id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [params.id]);

  if (loading) return <p className="text-center text-gray-600">กำลังโหลดข้อมูลห้อง...</p>;
  if (!room) return <p className="text-center text-red-500">❌ ไม่พบข้อมูลห้องพัก</p>;

  return (
    <div className="container mx-auto p-10 max-w-4xl bg-white shadow-2xl rounded-3xl border border-gray-300 mt-2">
      {/* ✅ ชื่อหอพัก */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        🏡 {room.seller.nameroom} - ห้อง {room.roomNumber}
      </h1>

      {/* ✅ รูปหอพัก */}
      <div className="w-full h-60 bg-gray-200 rounded-2xl overflow-hidden">
        <img src={room.seller.photoMain || "/default-image.jpg"} alt={room.seller.nameroom} className="w-full h-full object-cover" />
      </div>

      {/* ✅ ข้อมูลห้องพัก */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-700">
        <div className="space-y-4">
          <p className="text-lg flex items-center gap-2">
            🏢 <strong className="min-w-[130px]">เลขห้องพัก:</strong> {room.roomNumber}
          </p>
          <p className="text-lg flex items-center gap-2">
            💸 <strong className="min-w-[130px]">ค่าห้อง:</strong> {room.roomPrice} บาท/เดือน
          </p>
          <p className="text-lg flex items-center gap-2">
            🚿 <strong className="min-w-[130px]">ค่าน้ำ:</strong> {room.waterCost} บาท
          </p>
          <p className="text-lg flex items-center gap-2">
            ⚡ <strong className="min-w-[130px]">ค่าไฟ:</strong> {room.electricityCost} บาท
          </p>
          <p className="text-lg flex items-center gap-2">
            💰 <strong className="min-w-[130px]">เงินมัดจำ:</strong> {room.deposit} บาท
          </p>
          <p className="text-lg flex items-start gap-2">
            📝 <strong className="min-w-[130px]">รายละเอียด:</strong> {room.amenities}
          </p>
        </div>
      </div>

      {/* ✅ ปุ่มจองและกลับ */}
      <div className="flex justify-between mt-10">
        <Link href="/main/dormitory_book" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-10 py-3 rounded-full shadow-lg text-lg">
          🔙 ย้อนกลับ
        </Link>
        <Link href="/main/home" className="bg-green-500 hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-full shadow-xl text-lg">
          🚀 จองเลย
        </Link>
      </div>
    </div>
  );
}
