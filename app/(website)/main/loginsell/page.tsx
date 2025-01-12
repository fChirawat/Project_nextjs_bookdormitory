import NavReg from "@/components/NavReg";

export default function LoginSell() {
  return (
    <>
    <NavReg />

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Seller Login
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a
              href="#"
              className="text-sm text-pink-500 hover:underline"
            >
              Forgot Password?
            </a>
            <a
              href="registersell"
              className="text-sm text-pink-500 hover:underline"
            >
              Create an Account
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
}