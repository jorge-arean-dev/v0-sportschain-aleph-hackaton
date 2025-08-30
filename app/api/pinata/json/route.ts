import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/lib/pinataConfig";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const stringData = data.get("jsonData") as unknown as string;

    const jsonData = JSON.parse(stringData)
    
    const uploadData = await pinata.upload.json(jsonData)

    return NextResponse.json(uploadData.IpfsHash, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
