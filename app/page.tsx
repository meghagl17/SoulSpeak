// import Image from "next/image";
import Link from 'next/link';
import AuthStatusWrapper from './components/AuthStatusWrapper';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Welcome to Daily Buddy</h1>
        <AuthStatusWrapper />
        <p className="mt-4 text-lg">This is a simple Next.js application.</p>
        <div className="mt-6 space-y-3">
          <Link href="/login">
            <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">
              Get Started!
            </div>
          </Link>
          <Link href="/protected">
            <div className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-center block mt-3">
              View Protected Page
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
