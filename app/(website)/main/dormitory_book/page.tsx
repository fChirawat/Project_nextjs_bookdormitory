"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Room {
  roomNumber: string;
  isAvailable: boolean;
}

export default function Dormitorybook() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter(); 

  const handleSelectRoom = (roomNumber: string) => {
    setSelectedRoom((prev) => (prev === roomNumber ? null : roomNumber));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    setIsChecking(true);
    const mockRooms: Room[] = Array.from({ length: 2 }, (_, i) => ({
      roomNumber: `ห้อง ${i + 1}`,
      isAvailable: Math.random() > 0.5,
    }));
    setTimeout(() => {
      setRooms(mockRooms);
      setIsChecking(false);
    }, 1000);
  };

  const handleViewRoomDetail = (roomNumber: string) => {
    router.push(`/main/dormitory_detail/`);
};

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-xl rounded-3xl border border-gray-200 mt-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">🏡 หอพัก 🏡</h1>
        <p className="text-gray-600 mt-2">รายละเอียดข้อมูลหอพักและการจอง</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-300 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <strong className="w-40">🏢 ชื่อหอพัก :</strong> NP.Home
            </p>
            <p className="flex items-center gap-2">
              <strong className="w-40">📍 ที่อยู่ :</strong> ถ.พหลโยธิน แม่กา เมืองพะเยา พะเยา
            </p>
            <p className="flex items-center gap-2">
              <strong className="w-40">เดินทางถึงมหาลัย:</strong>เดินทางห่างจาก ม.พะเยา ประมาณ 650 เมตร
            </p>
          </div>
          <div className="flex items-center justify-center">
          <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
           <img
            src="/nphome1.webp"
            alt="nphome"
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
            onClick={fetchRooms}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow transition-transform transform hover:scale-105"
            disabled={isChecking}
          >
            {isChecking ? "🔄 กำลังโหลด..." : "🔄 โหลดสถานะห้องอีกครั้ง"}
          </button>
        </div>

        {isChecking ? (
          <p className="text-gray-600 text-center">กำลังโหลดข้อมูลห้อง...</p>
        ) : rooms.length > 0 ? (
          <div className="space-y-4">
            {rooms.map((room) => (
              <div
                key={room.roomNumber}
                className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm"
              >
                <p className="text-lg font-medium">{room.roomNumber}</p>
                <p className={room.isAvailable ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {room.isAvailable ? "✅ ว่าง" : "❌ ไม่ว่าง"}
                </p>
                <button
                  onClick={() => handleViewRoomDetail('101')}
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