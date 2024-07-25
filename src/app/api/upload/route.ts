import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  let filename: string = new URL(req.url).searchParams.get(
    "filename"
  ) as string;
  let blob = await put(filename, req.body as ReadableStream, {
    access: "public",
  });

  return NextResponse.json(blob);
}
