import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="mt-4 text-lg">This is a simple Next.js application.</p>
      <Link href="/information"> <div>get started!</div> </Link>
    </main>
  );
}
