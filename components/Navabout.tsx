export default function NavReg() {
    return (
      <nav className="bg-pink-200 border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* รูปภาพอยู่ด้านซ้าย */}
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/five-stars.png" alt="Five Stars" className="w-10 h-12 object-contain" />
          </a>
  
          {/* ข้อความ Register อยู่ตรงกลาง */}
          <div className="flex-grow flex justify-center">
            <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
             About
            </div>
          </div>
        </div>
      </nav>
    );
  }
  