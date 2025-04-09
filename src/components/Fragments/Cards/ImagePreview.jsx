import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

export default function ImagePreview({ src, onClose, className }) {
  return (
    <div className={`relative mt-4 max-w-xs ${className}`}>
      <button
        className="absolute -right-3 -top-3 cursor-pointer rounded-full bg-black text-3xl text-white"
        onClick={onClose}
      >
        <IoMdCloseCircle />
      </button>
      <img src={src} alt="Preview" className="aspect-square object-cover" />
    </div>
  );
}
