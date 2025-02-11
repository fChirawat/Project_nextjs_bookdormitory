'use client';
import Navconf from "@/components/Navconf";
import { useState, useEffect } from 'react';

export default function ConframProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("นาย");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [phoneRelationship, setPhoneRelationship] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
      return null;
    };

    const storedToken = getCookie("token") || localStorage.getItem("token");
    setToken(storedToken);
    console.log("🔑 Token จาก Client:", storedToken);
  }, []);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    folder: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result as string;

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image, folder }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();
        setImage(data.imageUrl);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload image.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // ตรวจสอบ Token
    if (!token) {
      alert("❌ ไม่มี Token หรือ Token ไม่ถูกต้อง");
      return;
    }
  
    // ตรวจสอบข้อมูลที่จำเป็น
    const missingFields = [];
    if (!firstname) missingFields.push("ชื่อจริง");
    if (!lastname) missingFields.push("นามสกุล");
    if (!address) missingFields.push("ที่อยู่");
    if (!phoneNumber) missingFields.push("เบอร์โทรศัพท์");
    if (!email) missingFields.push("อีเมล");
    if (!contactInfo) missingFields.push("ข้อมูลติดต่อ (Facebook / Line)");
    if (!idCardImage) missingFields.push("รูปบัตรประชาชน");
    if (!phoneRelationship) missingFields.push("เบอร์โทรศัพท์");
    if (!relationship) missingFields.push("พ่อ,แม่");
  
    if (missingFields.length > 0) {
      alert(`กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น!\nข้อมูลที่ขาด: ${missingFields.join(", ")}`);
      return;
    }
  
    // เตรียม payload
    const payload = {
      userId,
      title,
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      contactInfo,
      profileImage,
      phoneRelationship,
      relationship,
      idCardImage,
      status: "pending",
    };
  
    console.log("Submitting payload:", payload);
  
    try {
      const response = await fetch("/api/conprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
  
      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Raw response text:", responseText);
  
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { error: "Unknown error" };
        }
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
  
      const data = JSON.parse(responseText);
      alert("ส่งข้อมูลยืนยันตัวตนสำเร็จ!");
      console.log("Profile created:", data);
    } catch (error) {
      console.error("Profile submission error:", error);
      alert("Error submitting profile: " + error.message);
    }
  };


  return (
    <>
      <Navconf />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">ยืนยันตัวตน</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">อัปโหลดรูปโปรไฟล์</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setProfileImage, "profile_pictures")}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {profileImage && <img src={profileImage} alt="Profile" className="mt-2 w-24 h-24 object-cover rounded-full border border-gray-300 shadow-sm" />}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">อัปโหลดรูปบัตรประชาชน</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setIdCardImage, "id_cards")}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {idCardImage && <img src={idCardImage} alt="ID Card" className="mt-2 w-24 h-24 object-cover" />}
            </div>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>เลือกคำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
            </select>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="ชื่อจริง"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="นามสกุล"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="พ่อ,แม่,คนรู้จัก"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={phoneRelationship}
              onChange={(e) => setPhoneRelationship(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ที่อยู่"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Facebook / Line"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              ส่งข้อมูลยืนยันตัวตน
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
