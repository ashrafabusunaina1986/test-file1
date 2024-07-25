"use server";

import { put, PutBlobResult } from "@vercel/blob";

export async function uploadFile_Action(fd: FormData, u: string) {
  let file: File = fd.get("file") as File;

  let newBlob = put(file.name, file, { access: "public" });
  //   let response = await fetch(`/api/upload?filename=${file.name}`, {
  //     method: "POST",
  //     body: file,
  //   });

  //   const newBlob = (await response.json()) as PutBlobResult;

  return newBlob;
}
