'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function DormitoryDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [dormitory, setDormitory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchDormitory() {
      try {
        const response = await axios.get(`/api/dormitories/${id}`);
        setDormitory(response.data);
      } catch (error) {
        console.error('Error fetching dormitory details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDormitory();
  }, [id]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (!dormitory) return <p>ไม่พบข้อมูลหอพัก</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{dormitory.nameDormitory}</h1>
      <img src={dormitory.photoDormitory} alt={dormitory.nameDormitory} className="w-full h-60 object-cover" />
      <p className="mt-4">ที่อยู่: {dormitory.addressDormitory}</p>
      <p>ค่าเช่า: {dormitory.priceOther} บาท</p>
      <p>ค่าน้ำ: {dormitory.priceWater} บาท</p>
      <p>ค่าไฟ: {dormitory.priceElectricity} บาท</p>
      <p>เงินมัดจำ: {dormitory.roomDeposit} บาท</p>
      <p>รายละเอียด: {dormitory.dormitoryDetails}</p>
      <button
        onClick={() => alert(`คุณจองหอพัก ${dormitory.nameDormitory}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        จองเลย
      </button>
    </div>
  );
}
