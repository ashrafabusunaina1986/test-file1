"use client";
import { uploadFile_Action } from "@/action";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function FormFile() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const [selectfile, setSelectFile] = useState<File | null>(null);
  const [selectImage, setSelectImage] = useState<string>("");
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files?.[0] as File;
    setSelectFile(file);
    if (file) {
      const urlFile = URL.createObjectURL(file);
      setSelectImage(urlFile);
    }
    console.log(inputFileRef);
  };
  async function uploadFile(fd: FormData) {
    const file = await uploadFile_Action(fd, "/");
    console.log(file);
  }
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!inputFileRef.current?.files) {
          throw new Error("No file selected");
        }

        const file = inputFileRef.current.files[0];

        let res = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });
        const newBlob = (await res.json()) as PutBlobResult;
        setBlob(newBlob);
        console.log(newBlob);
      }}
      className="w-2/4 flex flex-col items-center gap-10 py-5"
    >
      <label
        htmlFor="file"
        className="w-[250px] h-[150px] border-2 border-purple-800 flex items-center justify-center aspect-video border-dashed "
      >
        <input
          type="file"
          onChange={handleChangeFile}
          name="file"
          ref={inputFileRef}
          id="file"
          required
          hidden
        />
        {selectImage ? (
          <Image
            src={selectImage}
            width={1500}
            height={1000}
            alt={selectfile?.name as string}
            className="w-full h-full border-2 border-purple-800 flex items-center justify-center aspect-video border-dashed"
          />
        ) : (
          <p>select File</p>
        )}
      </label>
      <button className="w-max bg-purple-300 px-5 py-3 rounded-full border-2 border-purple-700 text-purple-700 text-xl font-extrabold shadow-lg shadow-gray-400 hover:shadow-purple-500 active:bg-purple-800 active:text-purple-400">
        upload
      </button>
    </form>
  );
}
