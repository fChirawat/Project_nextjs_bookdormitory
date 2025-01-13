import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const dorms = [
    { 
      name: 'หอพัก A', 
      location: 'ใกล้มหาวิทยาลัย', 
      price: '3,500 บาท/เดือน', 
      description: 'หอพักสะอาดและปลอดภัย มีที่จอดรถ',
      image: '/images/dorm-a.jpg' // รูปภาพหอพัก A
    },
    { 
      name: 'หอพัก B', 
      location: 'ใกล้ตลาดสด', 
      price: '4,000 บาท/เดือน', 
      description: 'หอพักติดกับร้านสะดวกซื้อและสถานีรถไฟฟ้า',
      image: '/images/dorm-b.jpg' // รูปภาพหอพัก B
    },
    { 
      name: 'หอพัก C', 
      location: 'ใกล้สถานีขนส่ง', 
      price: '3,800 บาท/เดือน', 
      description: 'หอพักเงียบสงบและมีบริการอินเทอร์เน็ตฟรี',
      image: '/images/dorm-c.jpg' // รูปภาพหอพัก C
    },
    { 
      name: 'หอพัก D', 
      location: 'ใกล้ห้างสรรพสินค้า', 
      price: '4,200 บาท/เดือน', 
      description: 'หอพักมีกล้องวงจรปิดและมีร้านกาแฟในพื้นที่',
      image: '/images/dorm-d.jpg' // รูปภาพหอพัก D
    },
  ];

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>ยินดีต้อนรับสู่หน้าหอพัก</h1>
        <p>เลือกหอพักที่คุณสนใจ</p>

        <div className="space-y-6 mt-8">
          {dorms.map((dorm, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              {/* รูปภาพหอพัก */}
              <img
                src={dorm.image}
                alt={`ภาพของ ${dorm.name}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{dorm.name}</h2>
              <p className="text-gray-500">ทำเล: {dorm.location}</p>
              <p className="text-gray-500">ราคา: {dorm.price}</p>
              <div className="mt-2 overflow-auto max-h-32">
                <p className="text-gray-700">{dorm.description}</p>
              </div>
              <Link href={`/dorms/${dorm.name}`}>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  ดูรายละเอียด
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
