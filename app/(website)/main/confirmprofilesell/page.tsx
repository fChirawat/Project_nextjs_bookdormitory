'use client';
import Navconfile from "@/components/Navconfile";
import { useState } from 'react';

export default function Conframsell() {
  const [profileImage, setProfileImage] = useState<string | null>(null); // เก็บข้อมูลรูปภาพ

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string); // เก็บ URL รูปภาพใน state
      };
      reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL
    }
  };
  return (
  <>
      <Navconfile />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            ยืนยันตัวตนฝ่ายผู้ขาย
          </h2>
          <div className="avatar placeholder flex flex-col items-center gap-4 mt-4">
            {/* Profile */}
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 relative">
              <input
                type="file"
                className="file-input absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm flex items-center justify-center h-full">
                  อัปโหลดรูป
                </span>
              )}
            </div>
          </div>

          <form>
            {/* ชื่อ-นามสกุล */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium mb-2"
              >
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="ระบุชื่อ-นามสกุล"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            {/* ชื่อเล่น */}
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-gray-700 font-medium mb-2"
              >
                ชื่อเล่น
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="ชื่อเล่น"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            {/* NumberPhone */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="เบอร์โทรศัพท์"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            {/* ข้อมูลที่สามารถติดต่อได้ */}
            <div className="mb-4">
              <label
                htmlFor="contactInfo"
                className="block text-gray-700 font-medium mb-2"
              >
                ข้อมูลที่สามารถติดต่อได้
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                placeholder="Facebook / Line"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            {/* ที่อยู่ */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-medium mb-2"
              >
                ที่อยู่
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="ระบุที่อยู่"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
              ></textarea>
            </div>

            {/* ปุ่มส่งฟอร์ม */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                ส่งข้อมูลยืนยันตัวตน
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
