"use client"
//test git5
import Navfrom from "@/components/Navfrom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function FromSell() {
  const [userId, setUserId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [title, setTitle] = useState<string>("ไม่มีข้อมูล");
  const [firstName, setFirstName] = useState<string>("ไม่มีข้อมูล");
  const [lastName, setLastName] = useState<string>("ไม่มีข้อมูล");
  const [phoneNumber, setPhoneNumber] = useState<string>("ไม่มีข้อมูล");
  const [email, setEmail] = useState<string>("ไม่มีข้อมูล");
  const [error, setError] = useState<string>("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [images, setImages] = useState([]);
  const[addressDormitory,setaddressDormitory] =useState<string>("");
  const [distance, setDistance] =  useState<string>("");
  const [nameroom, setNameroom] = useState<string>("");
  const [roomCount, setRoomCount] = useState<number>(0);
  const [image, setImage] = useState(null); // state สำหรับเก็บรูปภาพที่เลือก

  const [formDataList, setFormDataList] = useState(
    [] as {
      nameDormitory: string;
      typeDormitory: string;
      addressDormitory: string;
      dormitoryDetails: string;
      facilitiesDormitory: string;
      roomNumber: string;
      roomDeposit: string;
      priceElectricity: string;
      priceWater: string;
      priceWifi: string;
      priceOther: string;
      photoDormitory: File | null;
      another :string;
    }[]
  );

  useEffect(() => {
    console.log("🔄 formDataList Updated:", formDataList);
  }, [formDataList]);
  

  useEffect(() => {
    setIsClient(true); // Prevents hydration error
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/fromsell", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        if (data.success) {
          const user = data.user;
          setUserId(user.userId || null);
          setTitle(user.title || "ไม่มีข้อมูล");
          setFirstName(user.firstName || "ไม่มีข้อมูล");
          setLastName(user.lastName || "ไม่มีข้อมูล");
          setPhoneNumber(user.phoneNumber || "ไม่มีข้อมูล");
          setEmail(user.email || "ไม่มีข้อมูล");
          setBank(user.bank || "ไม่มีข้อมูล");
          setAccountNumber(user.accountNumber || "ไม่มีข้อมูล");

        } else {
          setError("Error fetching user: " + data.message);
        }
      } catch (error) {
        setError("Error fetching user data");
      }
    };
    fetchUserData();
  }, []);

  const handleRoomCountChange = (count: number) => {
    setRoomCount(count);
    setFormDataList(
      Array.from({ length: count }, () => ({
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
        another : "",
        photoDormitory: null,
        images: [], // ✅ เพิ่มตรงนี้
      }))
    );
  };

  const handleRemoveRoom = (index: number) => {
    const updatedList = [...formDataList];
    updatedList.splice(index, 1);
    setFormDataList(updatedList);
    setRoomCount(updatedList.length);
  };

  const handleFormChange = (index: number, field: string, value: string) => {
    const newFormDataList = [...formDataList];
    if (newFormDataList[index]) {
      newFormDataList[index] = {
        ...newFormDataList[index],
        [field]: value,
      };
      setFormDataList(newFormDataList);
    } else {
      console.error(`Index ${index} ไม่ถูกต้องใน formDataList`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    const newFormDataList = [...formDataList];
    const existingImages = newFormDataList[index].images || [];
    const totalImages = existingImages.concat(files).slice(0, 6);
    newFormDataList[index].images = totalImages;
    setFormDataList(newFormDataList);
  };
  

  const validateForm = () => {
    if (!firstName || !lastName || !phoneNumber || !email || !bank || !accountNumber || !nameroom || !addressDormitory) {
      setError("กรุณากรอกข้อมูลผู้ขายให้ครบถ้วน");
      return false;
    }
    if (formDataList.some((room) => !room.roomNumber)) {
      setError("กรุณากรอกเลขห้องพักให้ครบถ้วน");
      return false;
    }
    if (!nameroom) {
      setError("กรุณากรอกชื่อหอพัก");
      return false;
    }
    
    setError("");
    return true;
    
  };

  const handleRemoveImage = (roomIndex: number, imageIndex: number) => {
    const updatedFormDataList = [...formDataList];
    updatedFormDataList[roomIndex].images = updatedFormDataList[roomIndex].images.filter(
      (_, i) => i !== imageIndex
    );
    setFormDataList(updatedFormDataList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const formData = new FormData();
      formData.append("userId", String(userId));
      formData.append("title", title);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("bank", bank);
      formData.append("accountNumber", accountNumber);
      formData.append("nameroom", nameroom);
      formData.append("addressDormitory",addressDormitory);

      // ✅ ส่งเฉพาะห้องแรกตามโครงสร้างที่ API รองรับ
      formDataList.forEach((room, roomIndex) => {
        formData.append(`rooms[${roomIndex}][typeDormitory]`, room.typeDormitory);
        formData.append(`rooms[${roomIndex}][dormitoryDetails]`, room.dormitoryDetails);
        formData.append(`rooms[${roomIndex}][facilitiesDormitory]`, room.facilitiesDormitory);
        formData.append(`rooms[${roomIndex}][roomNumber]`, room.roomNumber);
        formData.append(`rooms[${roomIndex}][roomDeposit]`, room.roomDeposit);
        formData.append(`rooms[${roomIndex}][priceElectricity]`, room.priceElectricity);
        formData.append(`rooms[${roomIndex}][priceWater]`, room.priceWater);
        formData.append(`rooms[${roomIndex}][priceWifi]`, room.priceWifi);
        formData.append(`rooms[${roomIndex}][priceOther]`, room.priceOther || "0"); // ใส่ค่าเริ่มต้นหากว่าง
        formData.append(`rooms[${roomIndex}][another]`, room.another);
      
        if (room.images) {
          room.images.forEach((image, imgIndex) => {
            formData.append(`rooms[0][images][${imgIndex}]`, image); // ✅ กำหนดเป็น 0
          });
        }
        
      
        if (room.photoDormitory) {
          formData.append(`rooms[${roomIndex}][photoDormitory]`, room.photoDormitory);
        }
      });
      
      

      images.forEach((image, idx) => {
        formData.append(`images_${idx}`, image);
      });
  
      // ✅ Debug: แสดงข้อมูลที่กำลังส่ง
      for (const [key, value] of formData.entries()) {
        console.log(`📩 ${key}:`, value);
      }
  
      const response = await fetch("/api/fromsell", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("🚨 Server Response:", errorData);
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
  
      alert("✅ ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("❌ Profile submission error:", error);
      alert("Error submitting profile: " + error);
    }
  };
  

  return (
    <>
      <Navfrom />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            แบบฟอร์มผู้ขาย
          </h2>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ชื่อ"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="นามสกุล"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="เบอร์โทร"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
               <input
                type="text"
                placeholder="ธนาคาร"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
               <input
                type="text"
                placeholder="เลขบัญชี"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
           
                 <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">ชื่อหอพัก</h3>
                   <input
                    type="text"
                    value={nameroom}
                    onChange={(e) => setNameroom(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-2"
                    placeholder="ชื่อหอพัก"
                   />
                  <input
                   type="text"
                   placeholder="ที่อยู่หอพัก"
                   value={addressDormitory}
                   onChange={(e) => setaddressDormitory(e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg mb-2"
                   />
                   <input
                   type="text"
                   placeholder="ระยะถึงมหาลัย"
                   value={distance}
                   onChange={(e) => setDistance(e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg mb-2"
                   />
                   {/* ส่วนอัปโหลดรูปภาพ */}
                   <label className="text-xl font-semibold mb-4 ">อัปโหลดรูปหอพัก</label>
                   <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full  px-4 py-2 border rounded-lg "
                    />
                     {/* แสดงพรีวิวรูปภาพที่อัปโหลด */}
                     {image && (
                       <div className="mt-4">
                       <p className="text-gray-600">พรีวิวรูปภาพ:</p>
                       <img
                       src={URL.createObjectURL(image)}
                       alt="รูปหอพัก"
                      className="mt-2 w-full h-128 object-cover rounded-lg"
                       />
                     </div>
                    )}
                 </div>
                
              

            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">จำนวนห้องพัก</h3>
              <input
                type="number"
                min="0"
                value={roomCount}
                onChange={(e) => handleRoomCountChange(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="กรอกจำนวนห้องพัก"
              />
            </div>

            {formDataList.map((room, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg relative">
                <button
                  type="button"
                  onClick={() => handleRemoveRoom(index)}
                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600"
                >
                  ลบ
                </button>
                <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 border border-gray-200">
                 <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  รายละเอียดห้องพัก #{index + 1}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                <input
                   type="text"
                   placeholder="เลขห้อง"
                   value={room.roomNumber}
                   onChange={(e) => handleFormChange(index, "roomNumber", e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                     <input
                  type="text"
                  placeholder="ค่าห้อง(บาท)"
                  value={room.priceWifi}
                  onChange={(e) => handleFormChange(index, "priceWifi", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                 />
                  <input
                   type="text"
                   placeholder="รายละเอียดเกี่ยวกับหอพัก"
                   value={room.dormitoryDetails}
                   onChange={(e) => handleFormChange(index, "dormitoryDetails", e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                   type="text"
                   placeholder="เงินมัดจำ (บาท)"
                   value={formDataList[index]?.roomDeposit || ""}
                   onChange={(e) => handleFormChange(index, "roomDeposit", e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                   type="text"
                   placeholder="สิ่งอำนวยความสะดวก"
                   value={room.facilitiesDormitory}
                   onChange={(e) => handleFormChange(index, "facilitiesDormitory", e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  /><input
                  type="text"
                  placeholder="ค่าไฟ (หน่วย/บาท)"
                  value={room.priceElectricity}
                  onChange={(e) => handleFormChange(index, "priceElectricity", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <select
                  id={`typeDormitory-${index}`}
                  value={room.typeDormitory}
                  onChange={(e) => handleFormChange(index, "typeDormitory", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required>
                  <option value="" disabled>เลือกประเภทหอพัก</option>
                  <option value="หอพักชาย">หอพักชาย</option>
                  <option value="หอพักหญิง">หอพักหญิง</option>
                  <option value="หอพักรวม">หอพักรวม</option>
                  <option value="คอนโด">คอนโด</option>
                  <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                  <option value="บ้านแฝด">บ้านแฝด</option>
                 </select>
                  <input
                  type="text"
                  placeholder="ค่าน้ำ (หน่วย/บาท)"
                  value={room.priceWater}
                  onChange={(e) => handleFormChange(index, "priceWater", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                 />
                 <input
                  type="text"
                  placeholder="ค่าอื่นๆ เช่น ฟอลนิเจอร์ , ตู้เย็น"
                  value={room.another}
                  onChange={(e) => handleFormChange(index, "another", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                 />


                </div>
                  {/* ✅ อัพโหลดรูปภาพ */}
                  <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {formDataList[index].images?.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative min-w-[160px]">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${imgIndex}`}
                        className="w-full h-40 object-cover rounded-lg"
                     />

                     <button
                      type="button"
                      onClick={() => handleRemoveImage(index, imgIndex)}
                       className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                      <X size={16} />
                      </button>
                    </div>
                   ))}
                  {formDataList[index].images?.length < 6 && (
                  <label className="min-w-[160px] h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                  <span className="text-gray-500">เพิ่มรูป</span>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={(e) => handleImageUpload(e, index)}
                     className="hidden"
                     multiple
                      />
                    </label>
                   )}
                 </div>
                </div>
              </div>
            </div>
           ))}

           {/* ✅ submit */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 text-lg font-semibold"
              >
                ส่งข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
