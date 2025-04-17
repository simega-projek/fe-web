import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export const MultiInputImage = ({ onImagesChange }) => {
  const [singleFile, setSingleFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const uploadSingleFiles = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const invalidFiles = [];
    let error = "";

    files.forEach((file) => {
      if (file.size <= 500 * 1024) {
        // 500 KB
        validFiles.push(URL.createObjectURL(file));
      } else {
        invalidFiles.push(file.name); // Simpan nama file yang invalid
      }
    });

    if (invalidFiles.length > 0) {
      error = `Ukuran gambar ${invalidFiles.join(", ")} melebihi 500 KB!`;
    }

    if (error) {
      setErrorMessage(error); // Set pesan kesalahan
    } else {
      setErrorMessage(""); // Reset pesan kesalahan
    }

    setSingleFile((prev) => [...prev, ...validFiles]); // Tambah file yang valid
    onImagesChange(validFiles); // Kirim gambar yang valid ke komponen utama
  };

  const removeImage = (index) => {
    const updatedFiles = [...singleFile];
    updatedFiles.splice(index, 1);
    setSingleFile(updatedFiles);
    onImagesChange(updatedFiles); // Update gambar yang diunggah ke komponen utama
  };

  return (
    <>
      {errorMessage && (
        <div className="mb-1 text-sm italic text-red-500">{errorMessage}</div>
      )}
      <div className="flex flex-wrap">
        {/* display images */}
        <div className="grid w-full grid-cols-3 gap-2">
          {singleFile.map((url, index) => {
            const isInvalid = url.includes("invalid"); // Logika untuk mendeteksi gambar invalid
            return (
              <div
                key={url}
                className={`relative overflow-hidden rounded-md border-2`}
              >
                <img
                  className="h-full w-full object-cover"
                  src={url}
                  alt="..."
                />
                <span
                  className="absolute right-0 top-0 cursor-pointer rounded-full bg-black text-3xl text-white"
                  onClick={() => removeImage(index)}
                >
                  <IoMdCloseCircle />
                </span>
              </div>
            );
          })}
        </div>

        {singleFile.length < 5 && (
          <div className="w-full">
            <div className="">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border-2 bg-tan">
                <button className="border-2 border-transparent text-xl text-white">
                  <FaRegImages />
                </button>
                <input
                  type="file"
                  name="multiImages"
                  accept="image/*"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  onChange={uploadSingleFiles}
                  multiple
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
