// src/app/documents/[documentId]/page.js
"use client";
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function DocumentView() {
  const router = useRouter();
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { documentId } = router.query;
      setDocumentId(documentId);
    }
  }, [router.isReady, router.query]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Editing Document: {documentId}</h1>
      <div className="border border-gray-300 p-4 rounded-lg bg-white">
        {/* Rich Text Editor (like Quill.js) will go here */}
        <p className="text-gray-600">This is where the rich text editor will be implemented.</p>
      </div>
    </div>
  );
}
