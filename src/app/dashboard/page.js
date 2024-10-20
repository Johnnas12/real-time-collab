// src/app/dashboard/page.js
'use client'
import Link from 'next/link';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';


export default function Dashboard() {
  const router = useRouter();

  const [user, loading] = useAuthState(auth);
  const userSession = sessionStorage.getItem('user');

  if (!loading && (!user || !userSession)) {
    router.push('/signup');
  }

  // Mock documents list, can be fetched from a database later
  const documents = [
    { id: 'doc1', name: 'Document 1' },
    { id: 'doc2', name: 'Document 2' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        Log out
      </button>
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
