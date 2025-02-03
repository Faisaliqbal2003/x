'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import components with no SSR
const Navigation = dynamic(() => import('../components/Navigation'), { ssr: false });
const TestSearch = dynamic(() => import('../components/TestSearch'), { ssr: false });

export default function TestPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
        <TestSearch />
      </div>
    </div>
  );
} 