'use client';
import Navconfile from "@/components/Navconfile";
import { useState, useEffect } from 'react';

export default function Conframsell() {
  const [isClient, setIsClient] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("กำลังโหลด...");
  const [email, setEmail] = useState<string>("กำลังโหลด...");
  const [phoneNumber, setPhoneNumber] = useState<string>("กำลังโหลด...");
  const [address, setAddress] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");

  useEffect(() => {
    setIsClient(true); // ป้องกัน Hydration Error
  }, []);

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/usersell', {
          method: "GET",
          credentials: "include"
        });

        const data = await response.json();

        if (data.success) {
          setUsername(data.user.username || "ไม่มีข้อมูล");
          setEmail(data.user.email || "ไม่มีข้อมูล");
          setPhoneNumber(data.user.phone || "ไม่มีข้อมูล");
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ 
      title, firstname, lastname, username, email, 
      phoneNumber, address, bank, accountNumber, 
      profileImage, idCardImage 
    });
  };

  return (
    <>
      <Navconfile />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            ยืนยันตัวตนฝ่ายผู้ขาย
          </h2>

          {/* Profile Image Upload */}
          {isClient && (
            <div className="avatar placeholder flex flex-col items-center gap-4 mt-4">
              <label className="block text-gray-700 font-medium">อัปโหลดรูปโปรไฟล์</label>
              <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 relative">
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                />
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm flex items-center justify-center h-full">
                    อัปโหลดรูป
                  </span>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Username</label>
              <input type="text" value={username} className="w-full px-4 py-2 border rounded-lg bg-gray-100" readOnly />
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">คำนำหน้า</label>
              <select value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                <option value="" disabled>เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </select>
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">ชื่อจริง</label>
              <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">นามสกุล</label>
              <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" value={email} className="w-full px-4 py-2 border rounded-lg bg-gray-100" readOnly />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">เบอร์โทรศัพท์</label>
              <input type="text" value={phoneNumber} className="w-full px-4 py-2 border rounded-lg bg-gray-100" readOnly />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">ที่อยู่</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            </div>

            {/* Bank */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">ธนาคาร</label>
              <input type="text" value={bank} onChange={(e) => setBank(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">เลขบัญชี</label>
              <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            </div>

            {/* ID Card Upload */}
            {isClient && (
              <>
                <label className="block text-gray-700 font-medium">อัปโหลดรูปถ่ายบัตรประชาชน</label>
                <input type="file" onChange={(e) => handleImageUpload(e, setIdCardImage)} className="w-full px-4 py-2 border rounded-lg" />
              </>
            )}

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              ส่งข้อมูลยืนยันตัวตน
            </button>
          </form>
        </div>
      </div>
    </>
  );
}