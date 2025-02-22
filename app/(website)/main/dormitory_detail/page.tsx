export const metadata = { title: "รายละเอียดหอพัก" };

export default async function DormitoryDetailPage({ searchParams }) {
  const id = searchParams?.id;
  if (!id) return <p>ไม่พบข้อมูลหอพัก</p>;

  const res = await fetch(`https://your-api.com/api/dormitories/${id}`);
  const dormitory = await res.json();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">{dormitory.nameDormitory}</h1>

      {/* Dormitory Image */}
      <div className="mb-6">
        <img
          src={dormitory.photoDormitory}
          alt={dormitory.nameDormitory}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Dormitory Details */}
      <div className="space-y-4">
        <div>
          <p className="text-xl font-medium text-gray-800">ที่อยู่: {dormitory.addressDormitory}</p>
        </div>
        <div>
          <p className="text-lg text-gray-700">ค่าเช่า: <span className="font-bold">{dormitory.priceOther} บาท</span></p>
        </div>
        <div>
          <p className="text-lg text-gray-700">รายละเอียด:</p>
          <p className="text-sm text-gray-600">{dormitory.dormitoryDetails}</p>
        </div>
      </div>

      {/* Button to go back or perform another action */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          กลับไปยังหน้าหอพัก
        </button>
      </div>
    </div>
  );
}
