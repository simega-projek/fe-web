import React, { useState } from "react";

export default function ImagePreview({ src, onClose }) {
  return (
    <div className="relative mt-4 max-w-xs">
      <button
        className="absolute -right-3 -top-3 cursor-pointer rounded-full bg-gray-300 px-3 py-1"
        onClick={onClose}
      >
        x
      </button>
      <img src={src} alt="Preview" className="aspect-square object-cover" />
    </div>
  );
}
