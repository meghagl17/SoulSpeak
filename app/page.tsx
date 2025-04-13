import Image from "next/image";
import Link from "next/link";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Background image taking up ~75% of screen */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        <Image
          src="/logo.jpeg"
          alt="Logo"
          fill
          priority
          className="object-cover rounded-b-3xl"
        />
      </div>

      {/* White section overlapping and going to bottom */}
      <div className="absolute top-[70vh] left-0 w-full z-10">
        <div className="bg-white rounded-t-3xl px-6 py-6 shadow-2xl h-[30vh] flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-800">
            Daily Buddy
          </h1>
          <p className="text-gray-500 mb-4 text-sm">
            Your companion for mindful mornings, productive days, and peaceful nights.
          </p>
          <Link href="/information">
            <div className="px-6 py-2 bg-[#F98500] text-white text-sm font-semibold rounded-full hover:bg-[#e97e00] transition">
              Let's Go!
              <ArrowRightAltIcon/>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
