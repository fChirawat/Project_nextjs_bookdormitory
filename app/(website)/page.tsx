'use client'; 

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // กำหนดให้เปิดอยู่เสมอ
  const allOptions = [
    'หอพัก A',
    'หอพัก B',
    'หอพัก C',
    'หอพัก D',
    'ใกล้มหาวิทยาลัย',
    'ใกล้ตลาดสด',
    'ใกล้สถานีขนส่ง',
    'ใกล้ห้างสรรพสินค้า',
  ];

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);

    if (text) {
      const filteredSuggestions = allOptions.filter((option) =>
        option.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchText(suggestion);
    setSuggestions([]); // Hide suggestions after selection
  };

  const dorms = [
    {
      name: 'หอพัก A',
      location: 'ใกล้มหาวิทยาลัย',
      price: '3,500 บาท/เดือน',
      description: 'หอพักสะอาดและปลอดภัย มีที่จอดรถ',
      image: '/images/dorm-a.jpg',
    },
    {
      name: 'หอพัก B',
      location: 'ใกล้ตลาดสด',
      price: '4,000 บาท/เดือน',
      description: 'หอพักติดกับร้านสะดวกซื้อและสถานีรถไฟฟ้า',
      image: '/images/dorm-b.jpg',
    },
    {
      name: 'หอพัก C',
      location: 'ใกล้สถานีขนส่ง',
      price: '3,800 บาท/เดือน',
      description: 'หอพักเงียบสงบและมีบริการอินเทอร์เน็ตฟรี',
      image: '/images/dorm-c.jpg',
    },
    {
      name: 'หอพัก D',
      location: 'ใกล้ห้างสรรพสินค้า',
      price: '4,200 บาท/เดือน',
      description: 'หอพักมีกล้องวงจรปิดและมีร้านกาแฟในพื้นที่',
      image: '/images/dorm-d.jpg',
    },
  ];

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 className="text-3xl font-bold">ยินดีต้อนรับสู่หน้าหอพัก</h1>
        <p className="text-gray-600 mt-2">เลือกหอพักที่คุณสนใจ</p>

        {/* Search Bar */}
        <div className="relative flex items-center justify-center mt-2">
          <label className="input input-bordered flex items-center gap-2 relative">
            <input
              type="text"
              style={{
                width: '800px',
                height: '40px',
                border: '2px solid gray',
                borderRadius: '8px',
                padding: '8px',
              }}
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ width: '24px', height: '24px' }}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* Dropdown Menu */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 bg-white border border-gray-300 rounded-lg w-full max-w-md shadow-lg z-10 mt-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/** Force Open */}
        <div className="grid justify-items-start  relative mt-1">
      <button
        className="btn bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none"
        onClick={() => setIsOpen(!isOpen)} // คลิกเพื่อสลับสถานะการเปิด
      >
        ราคา
      </button>

      {/* ใช้ isOpen เพื่อควบคุมการเปิดหรือปิดเมนู */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-white rounded-lg w-52 shadow-lg z-10">
          <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer transition-colors duration-200">
            สูง - ต่ำ
          </li>
          <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer transition-colors duration-200">
            ต่ำ - สูง
          </li>
        </ul>
      )}
    </div>

        {/* Dorm List */}
        <div className="flex flex-col items-center gap-6 mt-8 px-4">
          {dorms.map((dorm, index) => (
            <div
              key={index}
              className="bg-white w-full max-w-md p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={dorm.image}
                alt={`ภาพของ ${dorm.name}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{dorm.name}</h2>
                <p className="text-gray-500 text-sm">ทำเล: {dorm.location}</p>
                <p className="text-gray-500 text-sm">ราคา: {dorm.price}</p>
                <p className="text-gray-700 text-sm mt-2">{dorm.description}</p>
              </div>
              <Link href={`/dorms/${dorm.name}`}>
                <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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
