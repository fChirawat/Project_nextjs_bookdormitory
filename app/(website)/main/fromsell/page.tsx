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
          {/* ข้อมูลหอพัก */}
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-medium mb-2"
            >
              ชื่อหอพัก
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="ชื่อหอพัก"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* ข้อมูลที่อยู่หอพัก */}
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-medium mb-2"
            >
              ที่อยู่หอพัก
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="เขต/อำเภอ จังหวัด และรหัสไปรษณีย์"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

           {/* รายละเอียดหอพัก*/}
           <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-medium mb-2"
            >
              รายละเอียดหอพัก
            </label>
            <div className="p-1">
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="ขนาดห้องพัก"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            </div>

            <div className="p-1">
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="จำนวนห้องพัก"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            </div>

          </div>

          {/* ราคา */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              ราคา (บาท)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="ระบุราคา"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            
          </div>

          {/*ค่าใช้จ่ายเพิ่มเติม*/}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              ค่าใช้จ่ายเพิ่มเติม
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="ค่าไฟ/ค่าน้ำ/อินเทอร์เน็ต"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            
          </div>


          {/* เฟอร์นิเจอร์ */}
          <div className="mb-4">
            <label
              htmlFor="product"
              className="block text-gray-700 font-medium mb-2"
            >
              เฟอร์นิเจอร์
            </label>
            <input
              type="text"
              id="product"
              name="product"
              placeholder="เฟอร์นิเจอร์"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* กฏของหอพัก */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              กฏของหอพัก
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="ระบุรายละเอียดกฏของหอพัก"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>

          {/* หมายเหตุ */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              หมายเหตุ
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="ระบุรายละเอียด"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>

          {/* อัปโหลดรูปภาพหอพัก */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              อัปโหลดรูปภาพหอพัก ภายนอก/ภายใน
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
