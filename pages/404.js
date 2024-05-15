import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="sm:text-5xl text-4xl font-bold mb-9 p-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg text-white"
      >
        Go back to Home
      </Link>
    </div>
  );
}
