import Navlogin from "@/components/Navlogin";
import Link from "next/link";

export default function Login() {
  return (
    <>     
      <Navlogin />


      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>
          <form>
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                User
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-3">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-gray-500">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Button Google */}
            <div className="flex items-center justify-center mt-4">
              <button
                className="flex items-center gap-2 w-full max-w-xs py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <img
                  src="/google.png"
                  alt="Google Icon"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>

            {/* Button Facebook */}
            <div className="flex items-center justify-center mt-4">
              <button
                className="flex items-center gap-2 w-full max-w-xs py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <img
                  src="/facebook.png"
                  alt="Facebook Icon"
                  className="w-5 h-5"
                />
                Continue with Facebook
              </button>
            </div>

            <div className="flex items-center justify-center mt-4">
             <a
               href="loginsell"
               className="flex items-center gap-2 w-full max-w-xs py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
               >
                <img
                  src="/five-stars.png"
                  alt="five-stars"
                  className="w-5 h-5"
                 />
                  Login Affiliate
               </a>
              </div>



            {/* Additional Links */}
            <div className="flex items-center justify-between mb-4 mt-4">
            <a
              href="registersell"
              className="text-sm text-pink-500 hover:underline"
            >
             Apply Affiliate
            </a>
            <a
              href="register"
              className="text-sm text-pink-500 hover:underline"
            >
              Create an Account
            </a>
          </div>
          </form>
        </div>
      </div>
    <div>
      
      <h5>Login ของ คนซื้อ</h5>
    </div>

    </>
  );
}
