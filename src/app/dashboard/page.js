// src/app/dashboard/page.js
'use client'
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config'; // Import Firestore
import { getFirestore } from 'firebase/firestore'; // Ensure Firestore is initialized
import Header from '@/components/header';

export default function Dashboard() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const userSession = sessionStorage.getItem('user');
  const [documents, setDocuments] = useState([]);
  const [docName, setDocName] = useState(''); // State for new document name
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    if (!loading && (!user || !userSession)) {
      router.push('/signup');
    }

    // Fetch documents from Firestore
    const unsubscribe = onSnapshot(collection(db, 'documents'), (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDocuments(docs);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [loading, user, userSession, router]);

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  // Handle document creation
  const handleCreateDocument = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!docName) {
      setError('Document name is required');
      return;
    }

    try {
      await addDoc(collection(db, 'documents'), {
        name: docName,
      });
      setDocName(''); // Clear input field after submission
      setError(''); // Clear error message
    } catch (error) {
      console.error('Error creating document: ', error);
      setError('Failed to create document');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Header />
      
      <h1 className="text-3xl font-bold mb-4">create your document</h1>
      
      {/* Document Creation Form */}
      <form onSubmit={handleCreateDocument} className="mb-6">
        <input 
          type="text" 
          value={docName} 
          onChange={(e) => setDocName(e.target.value)} 
          placeholder="Enter document name" 
          className="border p-2 rounded mr-2"
          required 
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create Document
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
      </form>

      <ul className="mb-6">
        {documents.map((doc) => (
          <li key={doc.id} className="mb-4">
            <Link href={`/documents/${doc.id}`}>
              <div className="text-lg text-blue-500 hover:underline">{doc.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
