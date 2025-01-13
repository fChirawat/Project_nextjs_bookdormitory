<<<<<<< Updated upstream
'use client';
import Navconf from '@/components/Navconf';
import { useState } from 'react';

export default function ConfirmProfile() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSubmit = () => {
    if (fullName && email && phoneNumber) {
      alert("ยืนยันผู้ใช้งานสำเร็จ");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <>
      <Navconf />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center">
          <h5 className="text-lg font-bold text-gray-800">ยืนยันผู้ใช้งาน</h5>
          <p className="text-gray-600 mt-2">โปรดยืนยันตัวตนของคุณก่อนใช้งานระบบ</p>

          <div className="mt-6 space-y-4">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-gray-700 text-sm font-semibold mb-1">
                ชื่อผู้ใช้งาน
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้งาน"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 text-sm font-semibold mb-1">
                อีเมล
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="กรอกอีเมล"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-gray-700 text-sm font-semibold mb-1">
                หมายเลขโทรศัพท์
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="กรอกหมายเลขโทรศัพท์"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
export default function ConframProfile() {
 return (
    <>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            ยืนยันตัวตนผู้ใช้
          </h2>
          <div className="avatar placeholder flex flex-col items-center gap-4">
            {/* Profile */}
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 relative">
              <input
                type="file"
                className="file-input absolute inset-0 opacity-0 cursor-pointer"
              />
              <img
                id="preview"
                alt="Preview"
                className="w-full h-full object-cover"
>>>>>>> Stashed changes
              />
            </div>
          </div>

<<<<<<< Updated upstream
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </>

  );
}
=======
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
>>>>>>> Stashed changes
