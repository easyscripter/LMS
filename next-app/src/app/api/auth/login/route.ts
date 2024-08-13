import { apiService } from '@/services/apiService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const { username, password } = data;
  const response = await apiService.loginUser(username, password);

  if (response.jwt) {
    return NextResponse.json(response, { status: 200 });
  }
  return NextResponse.json(response, { status: 401 });
}
