import { NextResponse } from 'next/server';

// Mock data for messages
const mockMessages: Record<string, any[]> = {
  "usr_8499k": [
    { id: 1, sender: "user", text: "I'm having trouble with my Sony A7IV checkout.", time: "10:40 AM" },
    { id: 2, sender: "agent", text: "I see you have the Sony A7IV in your cart. Would you like a 5% discount to complete your purchase?", time: "10:41 AM" }
  ],
  "usr_1192x": [
    { id: 1, sender: "agent", text: "Hey Marcus, your Pace Running Shorts are almost sold out! Want to grab them now?", time: "09:00 AM" }
  ],
  "usr_9912z": [
    { id: 1, sender: "user", text: "Is the organic cotton dress sustainably sourced?", time: "11:00 AM" },
    { id: 2, sender: "agent", text: "Yes, Chloe! It's 100% GOTS certified organic cotton.", time: "11:01 AM" }
  ]
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const personaId = searchParams.get('personaId');

  // If a specific persona is requested (Workspace view)
  if (personaId && mockMessages[personaId]) {
    return NextResponse.json({ messages: mockMessages[personaId] });
  }

  // If no persona requested (Dashboard view), return structured channels
  return NextResponse.json({
    whatsapp: mockMessages["usr_8499k"] || [],
    sms: mockMessages["usr_1192x"] || [],
    instagram: mockMessages["usr_9912z"] || []
  });
}
