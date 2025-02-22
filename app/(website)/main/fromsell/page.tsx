"use client";
import Navfrom from "@/components/Navfrom";
import { useState, useEffect } from "react";

export default function FromSell() {
  const [userId, setUserId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("ไม่มีข้อมูล");
  const [firstName, setFirstName] = useState<string>("ไม่มีข้อมูล");
  const [lastName, setLastName] = useState<string>("ไม่มีข้อมูล");
  const [phoneNumber, setPhoneNumber] = useState<string>("ไม่มีข้อมูล");
  const [email, setEmail] = useState<string>("ไม่มีข้อมูล");
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    nameDormitory: "",
    typeDormitory: "",
    addressDormitory: "",
    dormitoryDetails: "",
    facilitiesDormitory: "",
    roomNumber: "",
    roomDeposit: "",
    priceElectricity: "",
    priceWater: "",
    priceWifi: "",
    priceOther: "",
    photoDormitory: null as File | null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/fromsell", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data.success) {
          const user = data.user;
          setUserId(user.userId || null);
          setTitle(user.title || "ไม่มีข้อมูล");
          setFirstName(user.firstName || "ไม่มีข้อมูล");
          setLastName(user.lastName || "ไม่มีข้อมูล");
          setPhoneNumber(user.phoneNumber || "ไม่มีข้อมูล");
          setEmail(user.email || "ไม่มีข้อมูล");
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
          throw new Error(errorData.error || "Failed to upload image");
        }

        const data = await response.json();
        setImage(data.imageUrl);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload image: " + error.message);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nameDormitory, typeDormitory, addressDormitory, dormitoryDetails, facilitiesDormitory, roomNumber, roomDeposit, priceElectricity, priceWater, priceWifi, priceOther, photoDormitory } = formData;

    if (!nameDormitory || !typeDormitory || !addressDormitory || !dormitoryDetails || !facilitiesDormitory || !roomNumber || !roomDeposit || !priceElectricity || !priceWater || !priceWifi || !priceOther || !photoDormitory) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("nameDormitory", nameDormitory);
    formData.append("typeDormitory", typeDormitory);
    formData.append("addressDormitory", addressDormitory);
    formData.append("dormitoryDetails", dormitoryDetails);
    formData.append("facilitiesDormitory", facilitiesDormitory);
    formData.append("roomNumber", roomNumber);
    formData.append("roomDeposit", roomDeposit);
    formData.append("priceElectricity", priceElectricity);
    formData.append("priceWater", priceWater);
    formData.append("priceWifi", priceWifi);
    formData.append("priceOther", priceOther);

    if (photoDormitory) {
      formDataToSend.append("photoDormitory", photoDormitory);
    }

    try {
      const response = await fetch("/api/fromsell", {
        method: "POST",
        body: formData, // Correct variable
      });
      
      

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }

      alert("ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("Profile submission error:", error);
      alert("Error submitting profile: " + error.message);
    }
  };

  return (
    <>
      <Navfrom />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">แบบฟอร์มผู้ขาย</h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}
          {/* ชื่อผู้ขาย */}
          <div className="mb-4">
            <label htmlFor="usernameSell" className="block text-gray-700 font-medium mb-2">
              ชื่อผู้ขาย
            </label>
            <input
              type="text"
              id="usernameSell"
              value={`${title} ${firstName} ${lastName}`}
              name="usernameSell"
              placeholder="ชื่อผู้ขาย"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              readOnly
            />
          </div>

          {/* เบอร์โทรศัพท์ */}
          <div className="mb-4">
            <label htmlFor="phoneSell" className="block text-gray-700 font-medium mb-2">
              เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              id="phoneSell"
              value={phoneNumber}
              name="phoneSell"
              placeholder="เบอร์โทรศัพท์"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              readOnly
            />
          </div>

          {/* อีเมล */}
          <div className="mb-4">
            <label htmlFor="emailSell" className="block text-gray-700 font-medium mb-2">
              อีเมล
            </label>
            <input
              type="email"
              id="emailSell"
              value={email}
              name="emailSell"
              placeholder="อีเมล"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              readOnly
            />
          </div>

          <form onSubmit={handleSubmit}>
            {/* ชื่อหอพัก */}
            <div className="mb-4">
              <label htmlFor="nameDormitory" className="block text-gray-700 font-medium mb-2">
                ชื่อหอพัก
              </label>
              <input
                type="text"
                id="nameDormitory"
                name="nameDormitory"
                placeholder="ชื่อหอพัก"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* ประเภทหอพัก */}
            <div className="mb-4">
              <label htmlFor="typeDormitory" className="block text-gray-700 font-medium mb-2">
                ประเภทหอพัก
              </label>
              <select
                id="typeDormitory"
                name="typeDormitory"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="" disabled selected>เลือกประเภทหอพัก</option>
                <option value="หอพักชาย">หอพักชาย</option>
                <option value="หอพักหญิง">หอพักหญิง</option>
                <option value="หอพักรวม">หอพักรวม</option>
                <option value="คอนโด">คอนโด</option>
                <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                <option value="บ้านแฝด">บ้านแฝด</option>
              </select>
            </div>

            {/* ที่อยู่หอพัก */}
            <div className="mb-4">
              <label htmlFor="addressDormitory" className="block text-gray-700 font-medium mb-2">
                ที่อยู่หอพัก
              </label>
              <textarea
                id="addressDormitory"
                name="addressDormitory"
                placeholder="เขต/อำเภอ จังหวัด และรหัสไปรษณีย์"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>

            {/* รายละเอียดหอพัก */}
            <div className="mb-4">
              <label htmlFor="dormitoryDetails" className="block text-gray-700 font-medium mb-2">
                รายละเอียดหอพัก
              </label>
              <textarea
                id="dormitoryDetails"
                name="dormitoryDetails"
                placeholder="รายละเอียดเกี่ยวกับหอพัก"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>

            {/* สิ่งอำนวยความสะดวก */}
            <div className="mb-4">
              <label htmlFor="facilitiesDormitory" className="block text-gray-700 font-medium mb-2">
                สิ่งอำนวยความสะดวก
              </label>
              <textarea
                id="facilitiesDormitory"
                name="facilitiesDormitory"
                placeholder="สิ่งอำนวยความสะดวก เช่น เตียง, ตู้เสื้อผ้า, เครื่องปรับอากาศ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>

            {/* จำนวนห้อง */}
            <div className="mb-4">
              <label htmlFor="roomNumber" className="block text-gray-700 font-medium mb-2">
                เลขห้องพัก
              </label>
              <input
                type="number"
                id="roomNumber"
                name="roomNumber"
                placeholder="ระบุเลขห้องพัก เช่น A103"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* เงินมัดจำ */}
            <div className="mb-4">
              <label htmlFor="roomDeposit" className="block text-gray-700 font-medium mb-2">
                เงินมัดจำ (บาท)
              </label>
              <input
                type="number"
                id="roomDeposit"
                name="roomDeposit"
                placeholder="เงินมัดจำ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* ค่าบริการต่างๆ */}
            <div className="mb-4">
              <label htmlFor="priceElectricity" className="block text-gray-700 font-medium mb-2">
                ค่าบริการไฟฟ้า (บาท)
              </label>
              <input
                type="number"
                id="priceElectricity"
                name="priceElectricity"
                placeholder="ค่าบริการไฟฟ้า"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceWater" className="block text-gray-700 font-medium mb-2">
                ค่าบริการน้ำ (บาท)
              </label>
              <input
                type="number"
                id="priceWater"
                name="priceWater"
                placeholder="ค่าบริการน้ำ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceWifi" className="block text-gray-700 font-medium mb-2">
                ค่าบริการอินเทอร์เน็ต (บาท)
              </label>
              <input
                type="number"
                id="priceWifi"
                name="priceWifi"
                placeholder="ค่าบริการอินเทอร์เน็ต"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceOther" className="block text-gray-700 font-medium mb-2">
                ค่าบริการอื่นๆ (บาท)
              </label>
              <input
                type="number"
                id="priceOther"
                name="priceOther"
                placeholder="ค่าบริการอื่นๆ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* รูปหอพัก */}
            <div className="mb-4">
              <label htmlFor="photoDormitory" className="block text-gray-700 font-medium mb-2">
                อัปโหลดรูปหอพัก
              </label>
              <input
                type="file"
                id="photoDormitory"
                name="photoDormitory"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, (imageUrl) => setFormData({ ...formData, photoDormitory: imageUrl }), "dormitories")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* ปุ่มส่งฟอร์ม */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                ส่งข้อมูลสินค้า
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
