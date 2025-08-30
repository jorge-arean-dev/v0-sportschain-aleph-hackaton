import { NextResponse } from "next/server";
import { pinata } from "@/lib/pinataConfig"

export const dynamic = "force-dynamic";

export async function GET() {
  // Handle your auth here to protect the endpoint
  try {
   
    return NextResponse.json({ url: 'url' }, { status: 200 }); // Returns the signed upload URL
  } catch (error) {
    console.log(error);
    return NextResponse.json({ text: "Error creating signed URL:" }, { status: 500 });
  }
}