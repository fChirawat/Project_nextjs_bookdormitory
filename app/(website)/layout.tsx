export default function WebsiteLayout({
    children,
}:  {
    children: React.ReactNode
}) {
    return(
        <>
            <div className="w-full h-16 bg-red-500 flex  items-center justify-center ">
                <div className="container  justify-between flex " >
                    <div className=""><h1>Navbar</h1></div>
                    <div className=" flex items-center justify-start">
                        <li>หน้าแรก</li>
                        <li>ค้นหาสินค้า</li>
                        <li>ตะกร้า</li>
                        <li>ตรวจสอบรายการ</li>
                        <li>บัญชี</li>
                    </div>
                </div>
            </div>
            <div className="">{children}</div>
        </>
    )
}