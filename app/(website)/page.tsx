import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to the Home Page!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          This is a simple example of a Next.js home page.
        </p>

        <div className="mt-8 space-x-4">
          <a
            href="/about"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Contact Us
          </a>
        </div>
      </main>
    </div>
  );
}
