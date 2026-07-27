import { NextResponse } from "next/server";

export async function POST(request) {

  const body = await request.json();

  const { amount, plan } = body;


  // Payment gateway integration will come here

  return NextResponse.json({
    success: true,
    message: "Payment order created",
    plan,
    amount
  });

}
