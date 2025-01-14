import NavRegsell from "@/components/Navragsell";
import Link from "next/link";
export default function RegisterSell() {
    return (
      <>
      <div>
      <NavRegsell />
        <div className="flex items-center justify-center min-h-screen bg-green-200">
          <form className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Welcome</h2>

            {/* Input: User Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="User Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: E-mail */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Number Phone */}
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Number Phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Input: Confirm Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="accept"
                className="mr-2"
              />
              <label htmlFor="accept" className="text-gray-700">
                Accept
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <Link href="/">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Sign Up
                </button>
              </Link>

            </div>
          </form>
        </div>
      </div>
      </>
    );
  }