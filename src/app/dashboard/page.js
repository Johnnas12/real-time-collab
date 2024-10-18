// src/app/dashboard/page.js
import Link from 'next/link';

export default function Dashboard() {
  // Mock documents list, can be fetched from a database later
  const documents = [
    { id: 'doc1', name: 'Document 1' },
    { id: 'doc2', name: 'Document 2' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Your Documents</h1>
      <ul className="mb-6">
        {documents.map((doc) => (
          <li key={doc.id} className="mb-4">
            <Link href={`/documents/${doc.id}`}>
              <div className="text-lg text-blue-500 hover:underline">{doc.name}</div>
            </Link>
          </li>
        ))}
      </ul>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Create New Document
      </button>
    </div>
  );
}
