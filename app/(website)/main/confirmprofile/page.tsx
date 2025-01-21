'use client';
import Navconf from '@/components/Navconf';
import { useState } from 'react';

export default function ConfirmProfile() {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [Idcardnumber, setIdcarddnumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [relationships, setRelationships] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null); // เก็บข้อมูลรูปภาพ

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string); // เก็บ URL รูปภาพใน state
      };
      reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL
    }
  };

  const handleSubmit = () => {
    if (
      firstname &&
      lastname &&
      email &&
      phoneNumber &&
      Idcardnumber &&
      address &&
      relationships &&
      contact
    ) {
      alert('ยืนยันผู้ใช้งานสำเร็จ');
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  return (
    <>
      <Navconf />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-pink-100 p-2">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center">ยืนยันผู้ใช้งาน</h2>
          <p className="text-gray-600 text-center mt-2">
            โปรดยืนยันตัวตนของคุณก่อนใช้งานระบบ
          </p>

          <div className="avatar placeholder flex flex-col items-center gap-4 mt-4">
            {/* Profile */}
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 relative">
              <input
                type="file"
                className="file-input absolute inset-0 opacity-0 cursor-pointer"
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

          <div className="mt-6 space-y-4">
            {/* Input Fields */}
            <InputField
              id="firstname"
              label="First Name (ชื่อ)"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="ชื่อ เช่น นาย**/นางสาว**/นาง**"
            />
            <InputField
              id="lastname"
              label="Last Name (นามสกุล)"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="นามสกุล"
            />
            <InputField
              id="email"
              label="Email (อีเมล)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมล เช่น XXXX@gmail.com "
            />
            <InputField
              id="Idcardnumber"
              label="ID Card Number (หมายเลขบัตรประจำตัวประชาชน)"
              value={Idcardnumber}
              onChange={(e) => setIdcarddnumber(e.target.value)}
              placeholder="หมายเลขบัตรประจำตัวประชาชน "
            />
            <InputField
              id="address"
              label="Address (ที่อยู่)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ที่อยู่ เช่น บ้านเลขที่***หมู่***ตำบล***อำเภอ***จังหวัด***"
            />
            <InputField
              id="contact"
              label="Contact Person (หมายเลขที่ติดต่อได้)"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="หมายเลขที่สามารถติดต่อได้"
            />
            <InputField
              id="relationships"
              label="Relationships (ความสัมพันธ์)"
              value={relationships}
              onChange={(e) => setRelationships(e.target.value)}
              placeholder="ความสัมพันธ์ของท่าน"
            />
            <InputField
              id="phoneNumber"
              label="Phone Number (หมายเลขโทรศัพท์)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="เบอร์โทรศัพท์ เช่น 012-345-****"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </>
  );
}

// Component for reusable input fields
function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-700 text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
      />
    </div>
  );
}
