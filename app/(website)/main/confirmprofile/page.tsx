'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // ✅ ใช้จัดการ Cookie
import Navconfile from "@/components/Navconfile";

Cookies.set('authToken', 'your-token-here', { expires: 7 }); // กำหนดเวลาในการหมดอายุของ Cookie



export default function ConframProfile() {
  const [userId, setUserId] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true); // Prevents hydration error
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/usersell", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data.success) {
          setUserId(data.user.id || null);
          setLastname(data.user.lastname || "ไม่มีข้อมูล");
          setEmail(data.user.email || "ไม่มีข้อมูล");
          setPhoneNumber(data.user.phone || "ไม่มีข้อมูล");
        } else {
          setError("Error fetching user: " + data.message);
        }
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    fetchUserData();
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

            // Ensure response is not empty
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await response.json();
            setImage(data.imageUrl); // ✅ Save Cloudinary URL

        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
        }
    };
    reader.readAsDataURL(file);
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 🔍 Log ค่าเพื่อการตรวจสอบก่อน submit
  console.log("🚀 ตรวจสอบค่าก่อน submit:", {
    userId,
    firstname,
    lastname,
    address,
    title,
    email,
    phoneNumber,
    contactInfo,
  });

  // 🔹 Ensure required fields are filled
  if (
    !userId || // ตรวจสอบ userId ว่าเป็น null หรือไม่
    !firstname.trim() || // ตรวจสอบชื่อว่ามีข้อมูลหรือไม่
    !lastname.trim() || // ตรวจสอบนามสกุลว่ามีข้อมูลหรือไม่
    !address.trim() || // ตรวจสอบที่อยู่ว่ามีข้อมูลหรือไม่
    !title.trim() || // ตรวจสอบคำนำหน้าว่ามีข้อมูลหรือไม่
    !email.trim() || // ตรวจสอบอีเมลว่ามีข้อมูลหรือไม่
    !phoneNumber.trim() || // ตรวจสอบเบอร์โทรศัพท์ว่ามีข้อมูลหรือไม่
    !contactInfo.trim() // ตรวจสอบข้อมูลติดต่อว่ามีข้อมูลหรือไม่
  ) {
    alert("กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น!");
    return;
  }

  console.log("✅ ข้อมูลครบทุกช่อง! กำลังส่ง API...");

  // 🔹 Prepare FormData payload
  const formData = new FormData();
  formData.append("userId", String(userId));
  formData.append("title", title);
  formData.append("firstName", firstname);
  formData.append("lastName", lastname);
  formData.append("email", email);
  formData.append("phoneNumber", phoneNumber);
  formData.append("address", address);
  formData.append("contactInfo", contactInfo);
  formData.append("status", "pending");

  if (profileImage) {
    const profileFile = await fetch(profileImage).then((res) => res.blob());
    formData.append("profileImage", profileFile, "profile.jpg");
  }

  console.log("Submitting FormData:", formData); // ✅ Log request before sending

  try {
    const response = await fetch("/api/confirmprofile", {
      method: "POST",
      body: formData, // ✅ ส่ง FormData
    });

    console.log("Response status:", response.status); // ✅ Log response status

    const responseText = await response.text();
    console.log("Raw response text:", responseText); // ✅ Log raw response

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { error: "Unknown error" };
      }
      throw new Error(errorData.error || "เกิดข้อผิดพลาดในการส่งข้อมูล");
    }

    alert("ส่งข้อมูลยืนยันตัวตนสำเร็จ!");
    console.log("Profile created successfully!");
  } catch (error) {
    console.error("Profile submission error:", error);
    alert("Error submitting profile: " + error.message);
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
                onChange={(e) => handleImageUpload(e, setProfileImage, "profile_pictures")}
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
