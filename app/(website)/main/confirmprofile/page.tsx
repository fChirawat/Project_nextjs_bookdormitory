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
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100 "
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
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
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
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
              />
            </div>
          </div>

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