'use client';
import Navconfile from "@/components/Navconfile";
import { useState } from 'react';
import { text } from "stream/consumers";

export default function ConframProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/comfrimprofile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, firstname, lastname, email, phoneNumber, contactInfo, address, profileImage 
        }),
      });

      const text = await response.text();
      console.log("📩 API Response:", text);

      try {
        const data = JSON.parse(text); // Try parsing as JSON
        console.log("📩 API Response:", data);
      } catch (error) {
        console.error("🔥 JSON Parsing Error:", error);
      }
    } catch (error) {
      console.error("🔥 Fetch Error:", error);
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
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 relative">
              <input
                type="file"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
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

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                คำนำหน้า
              </label>
              <select
                id="titlesell"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="" disabled>เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </select>
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstnamesell" className="block text-gray-700 font-medium mb-2">
                ชื่อจริง
              </label>
              <input
                type="text"
                id="firstnamesell"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="ชื่อจริง"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="lastnamesell" className="block text-gray-700 font-medium mb-2">
                นามสกุล
              </label>
              <input
                type="text"
                id="lastnamesell"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="นามสกุล"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="emailsell"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                id="phoneNumbersell"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="เบอร์โทรศัพท์"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Contact Info */}
            <div className="mb-4">
              <label htmlFor="contactInfo" className="block text-gray-700 font-medium mb-2">
                ข้อมูลที่สามารถติดต่อได้
              </label>
              <input
                type="text"
                id="contactInfo"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Facebook / Line"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                ที่อยู่
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ระบุที่อยู่"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-green-100"
              ></textarea>
            </div>

            {/* Submit Button */}
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

