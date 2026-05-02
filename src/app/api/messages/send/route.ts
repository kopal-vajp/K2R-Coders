import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { personaId } = body;

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: "Message dispatched successfully via omnichannel orchestrator",
      personaId 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }
}
