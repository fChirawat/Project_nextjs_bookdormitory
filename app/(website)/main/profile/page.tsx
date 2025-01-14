import Link from "next/link";

export default function Profile() {
  return (
    <>
      <div>
        <div className="flex items-center justify-center min-h-screen bg-green-200">
          <form className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center text-black mb-6">
              My Profile
            </h2>

            {/* Profile Image */}
            <div className="mb-4 flex justify-center">
              <img
                src="/five-stars.png" // ใส่เส้นทางที่ถูกต้องสำหรับภาพโปรไฟล์
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            </div>

            {/* Input: User Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="ชื่อผู้ใช้"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: First Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="ชื่อจริง"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Last Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="นามสกุล"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Address */}
            <div className="mb-4">
              <textarea
                placeholder="ที่อยู่"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            {/* Input: Phone */}
            <div className="mb-4">
              <input
                type="tel"
                placeholder="เบอร์โทร"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Photo ID Card */}
            <div className="mb-4">
              <label htmlFor="photoIdCard" className="block text-gray-700 mb-2">
                รูปบัตรประชาชน
              </label>
              <input
                type="file"
                id="photoIdCard"
                name="photoIdCard"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Relationship */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="ผู้ปกครอง (เช่น พ่อ, แม่)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Phone Relationship */}
            <div className="mb-4">
              <input
                type="tel"
                placeholder="เบอร์โทรผู้ปกครอง"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <Link href="/">
                <button
                  type="button"
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  แก้ไขข้อมูล
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
