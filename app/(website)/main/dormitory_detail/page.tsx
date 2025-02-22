export const metadata = { title: "รายละเอียดหอพัก" };

export default async function DormitoryDetailPage({ searchParams }) {
  const id = searchParams?.id;
  if (!id) return <p>ไม่พบข้อมูลหอพัก</p>;

  const res = await fetch(`https://your-api.com/api/dormitories/${id}`);
  const dormitory = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold">{dormitory.nameDormitory}</h1>
      <img src={dormitory.photoDormitory} alt={dormitory.nameDormitory} className="w-full h-60 object-cover" />
      <p>ที่อยู่: {dormitory.addressDormitory}</p>
      <p>ค่าเช่า: {dormitory.priceOther} บาท</p>
      <p>รายละเอียด: {dormitory.dormitoryDetails}</p>
    </div>
  );
}
