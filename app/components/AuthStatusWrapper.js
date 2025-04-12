"use client";

import dynamic from 'next/dynamic';

const AuthStatus = dynamic(() => import('./AuthStatus'), { ssr: false });

export default function AuthStatusWrapper() {
  return <AuthStatus />;
} 