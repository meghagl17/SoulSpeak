"use client";

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../lib/AuthContext';
// import AuthStatusWrapper from '../components/AuthStatusWrapper';

export default function ProtectedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
        <p className="mb-6">This page is currently under development.</p>
      </div>
    </div>
  );
}

//   const { isAuthenticated, isLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect to login if not authenticated and not loading
//     if (!isAuthenticated && !isLoading) {
//       router.push('/login');
//     }
//   }, [isAuthenticated, isLoading, router]);

//   // Show loading state if still checking authentication
//   if (isLoading) {
//     return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//   }

//   // Only render page content if authenticated
//   if (!isAuthenticated) {
//     return null; // Will redirect via useEffect
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
//         <p className="mb-6">This page is only visible to authenticated users.</p>
        
//         <div className="mb-8">
//           <AuthStatusWrapper />
//         </div>
        
//         <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Your Private Data</h2>
//           <p>This is some protected content that only logged-in users can see.</p>
//         </div>
//       </div>
//     </div>
//   );
// } 