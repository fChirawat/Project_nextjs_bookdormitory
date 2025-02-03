"use client";  // เพิ่มบรรทัดนี้เพื่อให้ไฟล์นี้ทำงานใน Client-Side

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ManageUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      console.log(response.data); // ตรวจสอบข้อมูลที่ได้
      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users); // หากข้อมูลอยู่ใน key "users"
      } else {
        console.error("Expected an array but got:", response.data);
        setUsers([]); // ตั้งค่าเป็น array ว่างหากข้อมูลไม่ถูกต้อง
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      alert("ลบผู้ใช้สำเร็จ");
      fetchUsers(); // รีเฟรชข้อมูล
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const deleteAllUsers = async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ทั้งหมด?")) {
      try {
        await axios.delete("/api/users");
        alert("ลบผู้ใช้ทั้งหมดสำเร็จ");
        fetchUsers(); // รีเฟรชข้อมูล
      } catch (error) {
        console.error("Failed to delete all users:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Manage Users</h1>
      <div className="flex justify-end mb-5">
        <button
          onClick={deleteAllUsers}
          className="bg-red-500 text-white px-4 py-2 rounded mr-3"
        >
          ลบผู้ใช้ทั้งหมด
        </button>
        <Link href="/dashboard">
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-3">
            กลับ Dashbord
          </button>
        </Link>
        <button
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded "
        >
          รีเฟรช
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center align-middle">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-center align-middle">ชื่อผู้ใช้</th>
            <th className="border border-gray-300 px-4 py-2 text-center align-middle">อีเมล</th>
            <th className="border border-gray-300 px-4 py-2 text-center align-middle">วันที่สมัคร</th>
            <th className="border border-gray-300 px-4 py-2 text-center align-middle">การกระทำ</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">{user.createdAt}</td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                ไม่มีข้อมูลผู้ใช้
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}