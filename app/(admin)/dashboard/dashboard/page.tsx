"use client";  // เพิ่มบรรทัดนี้เพื่อใช้ React hook ใน client-side
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get("/api/users");
      setUsers(usersResponse.data);

      const sellersResponse = await axios.get("/api/usersell");
      setSellers(sellersResponse.data);

      const roomsResponse = await axios.get("/api/formsell");
      setRooms(roomsResponse.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchData(); // Refresh data
      alert("ลบผู้ใช้สำเร็จ");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const deleteSeller = async (id: number) => {
    try {
      await axios.delete(`/api/usersell/${id}`);
      fetchData(); // Refresh data
      alert("ลบผู้ขายสำเร็จ");
    } catch (error) {
      console.error("Failed to delete seller:", error);
    }
  };

  const deleteRoom = async (id: number) => {
    try {
      await axios.delete(`/api/formsell/${id}`);
      fetchData(); // Refresh data
      alert("ลบหอพักสำเร็จ");
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <Link href="/dashboard">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-3"
        >
          กลับ Dashbord
        </button></Link>

      {/* Users Section */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">ผู้ใช้ทั้งหมด</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">ชื่อผู้ใช้</th>
              <th className="border border-gray-300 px-4 py-2">อีเมล</th>
              <th className="border border-gray-300 px-4 py-2">เบอร์โทร</th>
              <th className="border border-gray-300 px-4 py-2">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sellers Section */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">ผู้ขายทั้งหมด</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">ชื่อผู้ขาย</th>
              <th className="border border-gray-300 px-4 py-2">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td className="border border-gray-300 px-4 py-2">{seller.id}</td>
                <td className="border border-gray-300 px-4 py-2">{seller.username}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => deleteSeller(seller.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dormitories Section */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">หอพักทั้งหมด</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">ชื่อหอพัก</th>
              <th className="border border-gray-300 px-4 py-2">ที่อยู่</th>
              <th className="border border-gray-300 px-4 py-2">ราคา</th>
              <th className="border border-gray-300 px-4 py-2">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="border border-gray-300 px-4 py-2">{room.id}</td>
                <td className="border border-gray-300 px-4 py-2">{room.nameDormitory}</td>
                <td className="border border-gray-300 px-4 py-2">{room.addressDormitory}</td>
                <td className="border border-gray-300 px-4 py-2">{room.priceMonth}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => deleteRoom(room.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
