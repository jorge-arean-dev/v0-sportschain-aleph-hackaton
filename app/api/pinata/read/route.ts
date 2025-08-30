import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinataConfig";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get("cid");
    
    if (!cid) {
      return NextResponse.json({ error: "CID is required" }, { status: 400 });
    }
    
    const url = pinata.gateways.get(cid)

    return NextResponse.json(url , { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}