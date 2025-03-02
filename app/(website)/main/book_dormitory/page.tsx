"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Room {
  roomNumber: string;
  isAvailable: boolean;
}

export default function BookDormitory() {
  const [firstName, setFirstName] = useState<string>("ไม่มีข้อมูล");
  const [lastName, setLastName] = useState<string>("ไม่มีข้อมูล");
  const [phoneNumber, setPhoneNumber] = useState<string>("ไม่มีข้อมูล");
  const [email, setEmail] = useState<string>("ไม่มีข้อมูล");
  const [error, setError] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    accountNumber: "",
    contactInfo: "",
    phoneRelationship: "",
    relationship: "",
    checkInDate: "",
    specialRequest: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/fromsell", { method: "GET", credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        if (data.success) {
          const user = data.user;
          setFirstName(user.firstName || "ไม่มีข้อมูล");
          setLastName(user.lastName || "ไม่มีข้อมูล");
          setPhoneNumber(user.phoneNumber || "ไม่มีข้อมูล");
          setEmail(user.email || "ไม่มีข้อมูล");

          setFormData((prev) => ({
            ...prev,
            firstname: user.firstName || "",
            lastname: user.lastName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
          }));
        } else {
          setError("Error fetching user: " + data.message);
        }
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    fetchUserData();
    handleCheckAvailability();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRoom = (roomNumber: string) => {
    setSelectedRoom((prev) => (prev === roomNumber ? null : roomNumber));
  };

  const handleCheckAvailability = () => {
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
    window.location.href = `/main/dormitory_book`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) {
      alert("กรุณาเลือกห้องก่อนทำการจอง");
      return;
    }
    alert(`✅ การจองสำเร็จ! ขอบคุณ ${formData.firstname} ที่จองหอพักกับเรา ห้องที่เลือก: ${selectedRoom}`);
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-2xl rounded-3xl">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">จองหอพัก</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* เลือกห้อง */}
        <div className="bg-white shadow-xl rounded-3xl p-6 space-y-6 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center">📋 เลือกห้องพัก</h2>

          {isChecking ? (
            <p className="text-center text-gray-600">กำลังโหลดข้อมูลห้อง...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms
                .filter((room) => !selectedRoom || room.roomNumber === selectedRoom)
                .map((room) => (
                  <div
                    key={room.roomNumber}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-300 shadow-sm"
                  >
                    <div>
                      <p className="text-lg font-semibold">🏠 {room.roomNumber}</p>
                      <p className={`text-sm ${room.isAvailable ? "text-green-600" : "text-red-600"}`}>
                        {room.isAvailable ? "✅ ว่าง" : "❌ ไม่ว่าง"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewRoomDetail(room.roomNumber)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow transition-transform transform hover:scale-105"
                      >
                        ดูรายละเอียด
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectRoom(room.roomNumber)}
                        disabled={!room.isAvailable}
                        className={`px-4 py-2 rounded-2xl text-white font-medium ${
                          selectedRoom === room.roomNumber ? "bg-green-600" : "bg-gray-400 hover:bg-green-500"
                        } disabled:opacity-50`}
                      >
                        {selectedRoom === room.roomNumber ? "✅ เลือกแล้ว" : "เลือก"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* ข้อมูลผู้จอง */}
        {[
          { label: "ชื่อ", name: "firstname", value: formData.firstname },
          { label: "นามสกุล", name: "lastname", value: formData.lastname },
          { label: "Email", name: "email", value: formData.email },
          { label: "เบอร์โทรศัพท์", name: "phoneNumber", value: formData.phoneNumber },
          { label: "ที่อยู่", name: "address", value: formData.address },
          { label: "หมายเลขบัญชี", name: "accountNumber", value: formData.accountNumber },
          { label: "Facebook / Line", name: "contactInfo", value: formData.contactInfo },
          { label: "เบอร์โทรผู้ติดต่อ", name: "phoneRelationship", value: formData.phoneRelationship },
          { label: "ความสัมพันธ์", name: "relationship", value: formData.relationship },
        ].map(({ label, name, value }) => (
          <div key={name}>
            <label className="block text-lg font-semibold mb-2">{label}</label>
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}

        {/* วันที่เข้าพัก */}
        <div>
          <label className="block text-lg font-semibold mb-2">📅 วันที่เข้าพัก</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="submit"
            className={`${
              !selectedRoom ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            } text-white px-10 py-4 rounded-2xl shadow-xl text-lg`}
            disabled={!selectedRoom}
          >
            🚀 ยืนยันการจอง
          </button>

          <Link href="/main/home">
            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-10 py-4 rounded-2xl shadow-lg text-lg">
              🔙 กลับหน้าหลัก
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
