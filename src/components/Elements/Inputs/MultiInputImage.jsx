import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export const MultiInputImage = () => {
  var singleFileObj = [];
  var singleFileArray = [];
  const [singleFile, setSingleFile] = useState([]);

  const uploadSingleFiles = (e) => {
    singleFileObj.push(e.target.files);
    singleFileArray.push(URL.createObjectURL(singleFileObj[0][0]));
    setSingleFile([...singleFile, singleFileArray]);
  };

  console.log(singleFile);

  // const uploadFiles = (e) => {
  //   e.preventDefault();
  //   console.log(singleFile);
  // };

  const removeImage = (index) => {
    console.log("reomve");
    setSingleFile([
      ...singleFile.slice(0, index),
      ...singleFile.slice(index + 1, singleFile.length),
    ]);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {/* display images */}
        <div className="grid w-full grid-cols-3 gap-2">
          {singleFile.length !== 0 &&
            singleFile.map((url, index) => (
              <div
                key={url}
                className="relative overflow-hidden rounded-md border-2 border-gray-200"
              >
                <img
                  className="h-full w-full object-cover"
                  src={url}
                  alt="..."
                />
                <span
                  className="absolute right-0 top-0 cursor-pointer text-3xl text-white"
                  onClick={() => removeImage(index)}
                >
                  <IoMdCloseCircle />
                </span>
              </div>
            ))}
        </div>

        {singleFile.length > 4 ? null : (
          <div className="w-full">
            <div className=" ">
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
                />
              </div>
              <span className="text-sm italic">
                {" "}
                Maksimal 5 gambar dan harus .jpg .jpeg .png
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
