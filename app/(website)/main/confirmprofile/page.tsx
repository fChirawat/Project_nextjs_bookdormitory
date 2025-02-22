'use client';
import Navconf from "@/components/Navconf";
import { useState, useEffect } from 'react';

export default function ConframProfile() {
  const [isClient, setIsClient] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("นาย");
  const [username, setUsername] = useState("กำลังโหลด...");
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
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    setIsClient(true); // Prevents hydration error
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users", {
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

    // Ensure required fields are filled
    if (!userId || !firstname || !lastname || !address || !accountNumber || !idCardImage) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", String(userId));
    formData.append("title", title);
    formData.append("firstName", firstname);
    formData.append("lastName", lastname);
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("accountNumber", accountNumber);
    formData.append("status", "pending");

    // Add images to formData
    if (profileImage) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      formData.append("profileImage", blob, "profile.jpg");
    }

    if (idCardImage) {
      const response = await fetch(idCardImage);
      const blob = await response.blob();
      formData.append("photoIdCard", blob, "idcard.jpg");
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,  // Do not set `Content-Type`
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }

      alert("ส่งข้อมูลยืนยันตัวตนสำเร็จ!");
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
            <div className="avatar flex flex-col items-center justify-center">
              <label className="block text-gray-700 font-medium mb-2">อัปโหลดรูปโปรไฟล์</label>
              {isClient && (
                <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                  <span className="absolute flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full text-white text-3xl">+</span>
                  {profileImage && <img src={profileImage} alt="Profile" className="absolute w-24 h-24 rounded-full object-cover" />}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setProfileImage, "profile_pictures")}
                    className="w-24 h-24 rounded-full border border-gray-300 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            

            <select value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
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
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="นามสกุล"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="พ่อ,แม่,คนรู้จัก"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={phoneRelationship}
              onChange={(e) => setPhoneRelationship(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ที่อยู่"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="หมายเลขบัญชี"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />

{isClient && (
             <div className="flex flex-col items-center mb-6">
             <label className="block text-gray-700 font-medium mb-2">อัปโหลดรูปบัตรประชาชน</label>
           
             {/* กรอบอัปโหลดรูป */}
             <div className="relative w-28 h-28 border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
               {/* เครื่องหมาย + */}
               {!idCardImage && (
                 <span className="absolute text-gray-500 text-4xl font-bold">+</span>
               )}
           
               {/* รูปภาพแสดงเมื่ออัปโหลดแล้ว */}
               {idCardImage && (
                 <img src={idCardImage} alt="ID Card" className="w-full h-full object-cover" />
               )}
           
               {/* Input สำหรับอัปโหลด */}
               <input
                 type="file"
                 accept="image/*"
                 onChange={(e) => handleImageUpload(e, setIdCardImage, "id_cards")}
                 className="absolute inset-0 opacity-0 cursor-pointer"
               />
             </div>
           </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg"
            >
              ส่งข้อมูล
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
