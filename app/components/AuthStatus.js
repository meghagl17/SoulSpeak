"use client";

import { useAuth } from "../../lib/AuthContext";

export default function AuthStatus() {
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
      <div className="mb-2">
        {isAuthenticated ? (
          <div>
            <p className="font-medium">Logged in as: {user}</p>
            <button
              onClick={logout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </div>
  );
} 