'use client';

import { useEffect, useState } from 'react';

const DormitoryList = () => {
  const [dormitories, setDormitories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ใช้ข้อมูลตัวอย่างหอพักสำหรับทดสอบ
    const fetchDormitories = async () => {
      setLoading(true); // เริ่มโหลดข้อมูลใหม่

      // ตัวอย่างข้อมูลหอพัก
      const exampleDormitories = [
        {
          id: 1,
          nameDormitory: "หอพักศุภชัย",
          addressDormitory: "123 ถนนศรีนครินทร์ กรุงเทพมหานคร",
          phoneNumber: "090-123-4567",
          photoDormitory: "https://via.placeholder.com/300x200",
        },
        {
          id: 2,
          nameDormitory: "หอพักสุนทร",
          addressDormitory: "456 ถนนรามคำแหง กรุงเทพมหานคร",
          phoneNumber: "091-234-5678",
          photoDormitory: "https://via.placeholder.com/300x200",
        },
        {
          id: 3,
          nameDormitory: "หอพักนานา",
          addressDormitory: "789 ถนนเพชรเกษม กรุงเทพมหานคร",
          phoneNumber: "092-345-6789",
          photoDormitory: "https://via.placeholder.com/300x200",
        },
      ];

      setDormitories(exampleDormitories); // เก็บข้อมูลหอพักตัวอย่าง
      setLoading(false); // โหลดข้อมูลเสร็จสิ้น
    };

    fetchDormitories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        กำลังโหลด...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">หอพักทั้งหมด</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dormitories.map((dormitory) => (
          <div
            key={dormitory.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={dormitory.photoDormitory}
              alt={dormitory.nameDormitory}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{dormitory.nameDormitory}</h2>
              <p className="text-gray-600 mt-2">{dormitory.addressDormitory}</p>
              <p className="text-gray-600 mt-1">เบอร์ติดต่อ: {dormitory.phoneNumber}</p>
              <button
                onClick={() => handleBooking(dormitory.id)}
                className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                จองหอพัก
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const handleBooking = (id) => {
  // เปลี่ยนเส้นทางไปที่หน้าเพจการจองหอพัก
  window.location.href = `/book-dormitory/${id}`;
};

export default DormitoryList;
