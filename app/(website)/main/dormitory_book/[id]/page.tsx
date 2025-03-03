"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Room {
  id: number;
  roomNumber: string;
  isAvailable: boolean;
}

interface Dormitory {
  id: number;
  nameroom: string;
  addressDormitory: string;
  distance: string;
  photoMain: string;
  rooms: Room[];
}

export default function Dormitorybook({ params }: { params: { id: string } }) {
  const [dorm, setDorm] = useState<Dormitory | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDormitory();
  }, []);

  const fetchDormitory = async () => {
    setIsChecking(true);
    try {
      const res = await fetch(`/api/dorms/${params.id}`);
      const data = await res.json();
      setDorm(data);
    } catch (error) {
      console.error("Error fetching dormitory:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleViewRoomDetail = (roomId: number) => {
    router.push(`/main/dormitory_detail/${roomId}`);
  };

  if (!dorm) {
    return <p className="text-center text-gray-600">กำลังโหลดข้อมูลหอพัก...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-xl rounded-3xl border border-gray-200 mt-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">🏡 {dorm.nameroom} 🏡</h1>
        <p className="text-gray-600 mt-2">รายละเอียดข้อมูลหอพักและการจอง</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-300 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <strong className="w-40">🏢 ชื่อหอพัก :</strong> {dorm.nameroom}
            </p>
            <p className="flex items-center gap-2">
              <strong className="w-40">📍 ที่อยู่ :</strong> {dorm.addressDormitory}
            </p>
            <p className="flex items-center gap-2">
              <strong className="w-40">เดินทางถึงมหาลัย:</strong> {dorm.distance} กม.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src={dorm.photoMain || "/default-image.jpg"}
                alt={dorm.nameroom}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-300 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">📋 เลือกห้องพัก</h2>
          <button
            onClick={fetchDormitory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow transition-transform transform hover:scale-105"
            disabled={isChecking}
          >
            {isChecking ? "🔄 กำลังโหลด..." : "🔄 โหลดสถานะห้องอีกครั้ง"}
          </button>
        </div>

        {isChecking ? (
          <p className="text-gray-600 text-center">กำลังโหลดข้อมูลห้อง...</p>
        ) : dorm.rooms.length > 0 ? (
          <div className="space-y-4">
            {dorm.rooms.map((room) => (
              <div
                key={room.id}
                className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm"
              >
                <p className="text-lg font-medium">{room.roomNumber}</p>
                <p className={room.isAvailable ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {room.isAvailable ? "✅ ว่าง" : "❌ ไม่ว่าง"}
                </p>
                <button
                  onClick={() => handleViewRoomDetail(room.id)}
                  className="px-4 py-2 rounded-2xl text-white font-medium bg-blue-500 hover:bg-blue-600">
                  ดูรายละเอียด
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">ไม่พบข้อมูลห้องพัก</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Link
          href="/main/home"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-2xl shadow text-lg transition-transform transform hover:scale-105"
        >
          🔙 กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
