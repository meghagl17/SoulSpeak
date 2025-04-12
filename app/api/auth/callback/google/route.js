import { NextResponse } from 'next/server';

// This route handles callbacks from our FastAPI backend
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user');

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=AuthenticationFailed', request.url));
  }

  // You could set cookies here for a more secure approach
  // Or create a user session

  // For now, we'll just redirect to the home page
  // The login page already handles storing the user in localStorage
  return NextResponse.redirect(new URL('/', request.url));
} 