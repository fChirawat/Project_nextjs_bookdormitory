import Navfrom from "@/components/Navfrom";

export default function FromSell() {
  return (
    <>
      <Navfrom />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            แบบฟอร์มผู้ขาย
          </h2>
          <form>
            {/* ข้อมูลผู้ขาย */}
            <div className="mb-4">
              <label htmlFor="usernameSell" className="block text-gray-700 font-medium mb-2">
                ชื่อผู้ขาย
              </label>
              <input
                type="text"
                id="usernameSell"
                name="usernameSell"
                placeholder="ชื่อผู้ขาย"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneSell" className="block text-gray-700 font-medium mb-2">
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                id="phoneSell"
                name="phoneSell"
                placeholder="เบอร์โทรศัพท์"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="emailSell" className="block text-gray-700 font-medium mb-2">
                อีเมล
              </label>
              <input
                type="email"
                id="emailSell"
                name="emailSell"
                placeholder="อีเมล"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* ชื่อหอพัก */}
            <div className="mb-4">
              <label htmlFor="nameDormitory" className="block text-gray-700 font-medium mb-2">
                ชื่อหอพัก
              </label>
              <input
                type="text"
                id="nameDormitory"
                name="nameDormitory"
                placeholder="ชื่อหอพัก"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* ประเภทหอพัก */}
<div className="mb-4">
  <label htmlFor="typeDormitory" className="block text-gray-700 font-medium mb-2">
    ประเภทหอพัก
  </label>
  <select
    id="typeDormitory"
    name="typeDormitory"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    required
  >
    <option value="" disabled selected>เลือกประเภทหอพัก</option>
    <option value="หอพักชาย">หอพักชาย</option>
    <option value="หอพักหญิง">หอพักหญิง</option>
    <option value="หอพักรวม">หอพักรวม</option>
    <option value="หอพักรวม">คอนโด</option>
    <option value="หอพักรวม">บ้านเดี่ยว</option>
    <option value="หอพักรวม">บ้านแฝด</option>
  </select>
</div>


            {/* ที่อยู่หอพัก */}
            <div className="mb-4">
              <label htmlFor="addressDormitory" className="block text-gray-700 font-medium mb-2">
                ที่อยู่หอพัก
              </label>
              <textarea
                id="addressDormitory"
                name="addressDormitory"
                placeholder="เขต/อำเภอ จังหวัด และรหัสไปรษณีย์"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>

            {/* รายละเอียดหอพัก */}
            <div className="mb-4">
              <label htmlFor="dormitoryDetails" className="block text-gray-700 font-medium mb-2">
                รายละเอียดหอพัก
              </label>
              <textarea
                id="dormitoryDetails"
                name="dormitoryDetails"
                placeholder="รายละเอียดเกี่ยวกับหอพัก"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>

            {/* สิ่งอำนวยความสะดวก */}
            <div className="mb-4">
              <label htmlFor="facilitiesDormitory" className="block text-gray-700 font-medium mb-2">
                สิ่งอำนวยความสะดวก
              </label>
              <textarea
                id="facilitiesDormitory"
                name="facilitiesDormitory"
                placeholder="สิ่งอำนวยความสะดวก เช่น เตียง, ตู้เสื้อผ้า, เครื่องปรับอากาศ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              ></textarea>
            </div>

            {/* จำนวนห้อง */}
            <div className="mb-4">
              <label htmlFor="roomNumber" className="block text-gray-700 font-medium mb-2">
                เลขห้องพัก
              </label>
              <input
                type="number"
                id="roomNumber"
                name="roomNumber"
                placeholder="ระบุเลขห้องพัก เช่น A103"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* เงินมัดจำ */}
            <div className="mb-4">
              <label htmlFor="roomDeposit" className="block text-gray-700 font-medium mb-2">
                เงินมัดจำ (บาท)
              </label>
              <input
                type="number"
                id="roomDeposit"
                name="roomDeposit"
                placeholder="เงินมัดจำ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* ค่าใช้จ่าย */}
            <div className="mb-4">
              <label htmlFor="priceElectricity" className="block text-gray-700 font-medium mb-2">
                ค่าไฟ (หน่วย)
              </label>
              <input
                type="number"
                id="priceElectricity"
                name="priceElectricity"
                placeholder="หน่วยค่าไฟ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceWater" className="block text-gray-700 font-medium mb-2">
                ค่าน้ำ (หน่วย)
              </label>
              <input
                type="number"
                id="priceWater"
                name="priceWater"
                placeholder="หน่วยค่าน้ำ"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceWifi" className="block text-gray-700 font-medium mb-2">
                ค่าอินเทอร์เน็ต (บาท)
              </label>
              <input
                type="number"
                id="priceWifi"
                name="priceWifi"
                placeholder="ค่าอินเทอร์เน็ต"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceOther" className="block text-gray-700 font-medium mb-2">
                ค่าใช้จ่ายอื่น ๆ (บาท)
              </label>
              <input
                type="number"
                id="priceOther"
                name="priceOther"
                placeholder="ค่าใช้จ่ายเพิ่มเติม"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* รูปภาพหอพัก */}
            <div className="mb-4">
              <label htmlFor="photoDormitory" className="block text-gray-700 font-medium mb-2">
                รูปภาพหอพัก
              </label>
              <input
                type="file"
                id="photoDormitory"
                name="photoDormitory"
                accept="image/*"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* ปุ่มส่งฟอร์ม */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                ส่งข้อมูลสินค้า
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
