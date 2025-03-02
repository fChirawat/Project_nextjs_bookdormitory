"use client"

import { useParams } from 'next/navigation';

export default function DormitoryDetailPage() {
  const params = useParams();  // ใช้แทน router.query
  console.log("params:", params); // เช็กว่ามีค่ามั้ย

  const roomNumber = params?.roomNumber; // จะได้เช่น '101'

    const dormImages = [
        "/nphome1.webp",
        "/nphome3.webp",
        "/nphome2.webp",
    ];


  return (
    <>

      <div className="container mx-auto p-10 max-w-4xl bg-white shadow-2xl rounded-3xl border border-gray-300 mt-2">
  {/* ✅ ชื่อหอพัก */}
  <h1 className="text-4xl font-bold text-gray-900 text-center mb-6 flex items-center justify-center gap-2">
    🏡 NP.Home{roomNumber} 🏡
  </h1>

  {/* ✅ รูปหอพัก */}
        {/*✅ อธิบาย ถ้า dormImages มีแค่ 2 รูป มันก็จะแสดงแค่ 2 รูปถ้ามี 6 รูป ก็จะแสดงครบ 6 รูป */}
        <div className="grid grid-cols-3 gap-4">
    {dormImages.map((img, index) => (
      <div key={index} className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={img}
          alt={`ภาพหอพัก ${index + 1}`}
          className="w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    ))}
  </div>
  {/* ✅ ข้อมูลหอพัก */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-700">
  <div className="space-y-4">
    <p className="text-lg flex items-center gap-2">
      🏢 <strong className="min-w-[130px]">เลขห้องพัก:</strong>
      <span> - {roomNumber}</span>
    </p>
    <p className="text-lg flex items-center gap-2">
      🏠 <strong className="min-w-[130px]">ประเภทหอพัก:</strong>
      <span>หอพักรวม{''}</span>
    </p>
    <p className="text-lg flex items-center gap-2">
      🛏️ <strong className="min-w-[130px]">สิ่งอำนวยความสะดวก:</strong>
      <span>เตียง+ที่นอน 5 ฟุต,ตู้เสื้อผ้า,เครื่องทำน้ำอุ่น,โต๊ะ+เก้าอี้ สำหรับอ่านหนังสือ 1 ชุด {''}</span>
    </p>
    <p className="text-lg flex items-center gap-2">
      💸 <strong className="min-w-[130px]">ค่าห้อง:</strong>
      <span>2200 - 2900{''} บาท/เดือน</span>
    </p>
    <p className="text-lg flex items-center gap-2">
      🚿 <strong className="min-w-[130px]">ค่าน้ำ:</strong>
      <span>รวมในค่าห้อง{''}</span>
    </p>
    <p className="text-lg flex items-center gap-2">
      ⚡ <strong className="min-w-[130px]">ค่าไฟ:</strong>
      <span>7{''} บาท</span>
    </p>
    <p className="text-lg flex items-center gap-2">
      💰 <strong className="min-w-[130px]">เงินมัดจำ:</strong>
      <span>1000{''} บาท</span>
    </p>
    <p className="text-lg flex items-start gap-2">
      📝 <strong className="min-w-[130px]">ค่าอื่นๆ:</strong>
      <span>-{''}</span>
    </p>
    <p className="text-lg flex items-start gap-2">
      📝 <strong className="min-w-[130px]">รายละเอียดเกี่ยวกับหอพัก:</strong>
      <span>เข้าอยู่เดือนแรก ล่วงหน้า 1 เดือน ประกัน 1 เดือน{''}</span>
    </p>
  </div>
</div>


  {/* ✅ ปุ่มจองและกลับ */}
  <div className="flex justify-center md:justify-between items-center mt-10 gap-4 flex-wrap">
    <a
      href="/main/dormitory_book"
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-10 py-3 rounded-full shadow-lg text-lg transition-transform transform hover:scale-105">
      🔙 ย้อมกลับ
    </a>

    <a
      href="/main/home"
      className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold px-10 py-3 rounded-full shadow-xl text-lg transition-transform transform hover:scale-105   ">
      🚀 จองเลย
    </a>
  </div>
</div>

    </>
  );
}
