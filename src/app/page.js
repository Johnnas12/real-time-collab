import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Real-time Collaboration Tool</h1>
      <p className="text-xl text-gray-700 mb-8">Collaborate on documents in real-time, with live chat and version control.</p>
      <Link href="/dashboard">
        <div className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Go to Dashboard</div>
      </Link>
    </div>
  );
}
