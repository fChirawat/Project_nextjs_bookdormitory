import NavReg from "@/components/NavReg";

export default function Conframsell() {
    return (
      <>
      <NavReg />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ยืนยันตัวตนฝ่ายผู้ขาย
        </h2>
        <div className="avatar placeholder flex flex-col items-center gap-4">
      {/* Profile Image Display */}
      <div className="w-24 rounded-full overflow-hidden border border-gray-300">
      <input type="file" className="file-input w-full max-w-xs" />
      </div>
    </div>
        <form>
          {/* ชื่อ */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-2"
            >
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="ระบุชื่อ-นามสกุล"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* ชื่อเล่น */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              ชื่อเล่น
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ชื่อเล่น"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="idNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* NumberPhone */}
          <div className="mb-4">
            <label
              htmlFor="idNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              NumberPhone
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="NumberPhone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* ข้อมูลที่สามารถติดต่อได้ */}
          <div className="mb-4">
            <label
              htmlFor="idNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Addline1
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="Facebook / Line "
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* ที่อยู่ */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              ที่อยู่
            </label>
            <textarea
              id="address"
              name="address"
              rows="4"
              placeholder="ระบุที่อยู่"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>

          {/* ปุ่มส่งฟอร์ม */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              ส่งข้อมูลยืนยันตัวตน
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
    );
  }