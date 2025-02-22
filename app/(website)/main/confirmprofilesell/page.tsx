"use client";
import Navconfile from "@/components/Navconfile";
import { useState, useEffect } from "react";

export default function Conframsell() {
  const [userId, setUserId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("กำลังโหลด...");
  const [email, setEmail] = useState("กำลังโหลด...");
  const [phoneNumber, setPhoneNumber] = useState("กำลังโหลด...");
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
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
          setUsername(data.user.username || "ไม่มีข้อมูล");
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

  // 🔹 Ensure required fields are filled
  if (!userId || !firstname || !lastname || !address || !bank || !accountNumber || !idCardImage) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น!");
      return;
  }

   // 🔹 Prepare FormData payload
   const formData = new FormData();
   formData.append("userId", String(userId));
   formData.append("title", title);
   formData.append("firstName", firstname);
   formData.append("lastName", lastname);
   formData.append("username", username);
   formData.append("email", email);
   formData.append("phoneNumber", phoneNumber);
   formData.append("address", address);
   formData.append("bank", bank);
   formData.append("accountNumber", accountNumber);
   formData.append("status", "pending");
   // 🔹 Append images if available
   if (profileImage) {
     const profileFile = await fetch(profileImage).then(res => res.blob());
     formData.append("profileImage", profileFile, "profile.jpg");
   }
   if (idCardImage) {
     const idCardFile = await fetch(idCardImage).then(res => res.blob());
     formData.append("photoIdCard", idCardFile, "idcard.jpg");
   }
   console.log("Submitting FormData:", formData); // ✅ Log request before sending
 
  try {
    const response = await fetch("/api/profilesell", {
      method: "POST",
      body: formData, // ✅ Sending as FormData
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

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            ยืนยันตัวตนฝ่ายผู้ขาย
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {isClient && (
            <div className="mb-4">
            <label className="block text-gray-700 font-medium">อัปโหลดรูปโปรไฟล์</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setProfileImage, "profile_pictures")}
                className="w-full px-4 py-2 border rounded-lg"
            />
            {profileImage && <img src={profileImage} alt="Profile" className="mt-2 w-24 h-24 object-cover" />}
          </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                value={username}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">คำนำหน้า</label>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="" disabled>เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">ชื่อจริง</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">นามสกุล</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">ที่อยู่</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">ธนาคาร</label>
              <input
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">เลขบัญชี</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {isClient && (
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
            )}

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