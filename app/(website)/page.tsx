import Link from 'next/link';
import React from 'react';

// Card Component
const Card = ({
  image,
  title,
  location,
  rating,
  reviews,
  priceBefore,
  priceAfter,
  discount,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
      {/* ภาพ */}
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full md:w-48 rounded-lg object-cover"
        />
      </div>

      {/* เนื้อหา */}
      <div className="flex-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{location}</p>
        <p className="text-sm text-blue-500">
          {rating} ดีเยี่ยม ({reviews} รีวิว)
        </p>

        <ul className="mt-2 text-sm text-gray-600 space-y-1">
          <li>✅ เช็คอินออนไลน์</li>
          <li>✅ ฟรีอินเทอร์เน็ตไร้สาย (Wi-Fi)</li>
        </ul>
      </div>

      {/* ราคา */}
      <div className="text-right">
        <p className="text-red-500 line-through">฿{priceBefore}</p>
        <p className="text-green-500 font-bold text-lg">฿{priceAfter}</p>
        <p className="text-sm text-gray-500">ลด {discount}%</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
          ดูห้องพัก
        </button>
      </div>
    </div>
  );
};

// Home Component
export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-pink-200 border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/five-stars.png"
              alt="Five Stars"
              className="w-48 h-12 object-contain"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              OUR PROJECT
            </span>
          </a>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-pink-200 ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500  dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500  dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-black md:dark:hover:text-red-500  dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* เนื้อหา */}
      <div>
        <h1 className="p-10 text-3xl font-bold">หอพักที่เหมาะสำหรับท่าน</h1>

        {/* ใช้ Card Component */}
        <Card
          image=""
          title=""
          location=""
          rating={0}
          reviews={0}
          priceBefore={0}
          priceAfter={0}
          discount={0}
        />
      </div>
    </>
  );
}
