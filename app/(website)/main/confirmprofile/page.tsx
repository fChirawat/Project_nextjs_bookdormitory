'use client';
import { NextApiRequest, NextApiResponse } from 'next';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // ✅ ใช้จัดการ Cookie
import Navconfile from "@/components/Navconfile";

Cookies.set('authToken', 'your-token-here', { expires: 7 }); // กำหนดเวลาในการหมดอายุของ Cookie



export default function ConframProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // ✅ ดึง Token จาก Cookie ตอนโหลดหน้า
  useEffect(() => {
    const savedToken = Cookies.get('authToken'); 
    console.log("🔍 Token ที่ดึงได้จาก Cookie:", savedToken); // ✅ เช็ค Token
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ ฟังก์ชันส่งข้อมูลไป API พร้อม Token
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('❌ ไม่พบ Token โปรดเข้าสู่ระบบใหม่');
      return;
    }
  
    setLoading(true);
    console.time("⏳ API Response Time");
  
    try {
      const response = await fetch('/app/api/confirmprofilm/route', { // ✅ แก้ชื่อ API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ ส่ง Token ไปด้วย
        },
        body: JSON.stringify({
          title,
          firstname,
          lastname,
          email,
          phoneNumber,
          contactInfo,
          address,
          profileImage,
        }),
      });
  
      console.timeEnd("⏳ API Response Time");
  
      const data = await response.json();
      if (response.ok) {
        alert('✅ บันทึกข้อมูลสำเร็จ!');
      } else {
        alert(`❌ เกิดข้อผิดพลาด: ${data.error}`);
      }
    } catch (error) {
      console.error("🔥 Fetch Error:", error);
      alert('❌ ไม่สามารถเชื่อมต่อ API');
    } finally {
      setLoading(false);
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
                accept="image/*"
              />
              {profileImage ? (
                <img src={profileImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm flex items-center justify-center h-full">
                  อัปโหลดรูป
                </span>
              )}
            </div>
          </div>

          {/* ✅ ฟอร์มส่งข้อมูล */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                คำนำหน้า
              </label>
              <select
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="" disabled>เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">ชื่อจริง</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">นามสกุล</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">เบอร์โทรศัพท์</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">ข้อมูลที่สามารถติดต่อได้</label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 bg-green-100"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">ที่อยู่</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 bg-green-100"
              ></textarea>
            </div>

            <div className="mb-4">
            <button
  type="submit"
  className={`w-full py-2 px-4 rounded-lg text-white ${
    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
  }`}
  disabled={loading}
>
  {loading ? "⏳ กำลังส่งข้อมูล..." : "ส่งข้อมูลยืนยันตัวตน"}
</button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}
