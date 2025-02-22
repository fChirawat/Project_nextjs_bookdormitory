// Add this line at the very top of the file to mark it as a client component
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavHome from "@/components/NavHome";

// Card Component
const Card = ({
  mainImage,
  secondaryImages,
  nameDormitory,
  typeDormitory,
  distanceDormitory,
  priceMonth,
  roomDeposit,
  priceElectricity,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row w-full max-w-4xl mx-auto mb-6 bg-white">
      {/* Main and Secondary Images */}
      <div className="flex w-full md:w-1/3 mb-4 md:mb-0">
        {/* Main Image */}
        <div className="flex flex-col items-center w-full md:w-2/3 border border-gray-300 rounded-lg p-2">
          <img
            src={mainImage}
            alt="Main Dormitory"
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-center text-xs mt-2 text-gray-500">ตำแหน่งที่ 1</p>
        </div>

        {/* Secondary Images */}
        <div className="flex flex-col w-1/3 space-y-2 pl-4">
          {secondaryImages.map((image, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-2 flex flex-col items-center"
            >
              <img
                src={image}
                alt={`Secondary ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <p className="text-center text-xs mt-2 text-gray-500">ตำแหน่งที่ {index + 2}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 ml-6 flex flex-col justify-between">
        {/* Details */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{nameDormitory}</h3>
          <p className="text-sm text-gray-600 mb-2">ประเภทหอพัก: {typeDormitory}</p>
          <p className="text-sm text-gray-600 mb-4">ห่างจากมหาวิทยาลัย: {distanceDormitory}</p>

          <div className="text-sm text-gray-700 space-y-2">
            <p>ค่าเช่าห้องต่อเดือน: {priceMonth}฿</p>
            <p>ค่ามัดจำล่วงหน้า: {roomDeposit}฿</p>
            <p>ค่าไฟฟ้าต่อหน่วย: {priceElectricity}฿</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-end space-y-2 mt-6">
          <Link
            href="/main/dormitory_detail"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition w-full sm:w-auto text-center"
          >
            รายละเอียด
          </Link>
          <Link
            href="/main/book_dormitory"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto text-center"
          >
            จองหอพัก
          </Link>
        </div>
      </div>
    </div>
  );
};

// Home Component
export default function Home() {
  const [dormitories, setDormitories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dormitory data from the API
    const fetchDormitories = async () => {
      try {
        const response = await fetch('/api/dormitories');
        const data = await response.json();
        if (data.success) {
          setDormitories(data.dormitories);
        } else {
          console.error('Error fetching dormitories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching dormitories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDormitories();
  }, []);

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <>
      <NavHome />

      {/* Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">รายการหอพัก</h1>

        {/* Render Card Components */}
        {dormitories.map((dormitory) => (
          <Card
            key={dormitory.id}
            mainImage={dormitory.photoDormitory}
            secondaryImages={dormitory.secondaryImages}
            nameDormitory={dormitory.nameDormitory}
            typeDormitory={dormitory.typeDormitory}
            distanceDormitory={dormitory.distanceDormitory}
            priceMonth={dormitory.priceMonth}
            roomDeposit={dormitory.roomDeposit}
            priceElectricity={dormitory.priceElectricity}
          />
        ))}
      </div>
    </>
  );
}
