import { Button } from "flowbite-react";
import React, { useState } from "react";

export default function ManyInputImage({ onImagesChange }) {
  // Tambahkan props
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isMessage, setIsMessage] = useState("");

  // Handle adding new image input field
  const addImageInput = () => {
    if (images.some((image) => image === null)) {
      setIsMessage("Isi gambar terlebih dahulu");
      return;
    } else {
      setIsMessage("");
      setImages([...images, null]);
      setPreviews([...previews, null]);
    }
  };

  // Handle removing an image input field
  const removeImageInput = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
    onImagesChange(updatedImages); // Update state di komponen induk
  };

  // Handle image file change and update the preview
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
      onImagesChange(updatedImages); // Kirim data ke komponen induk

      const updatedPreviews = [...previews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setPreviews(updatedPreviews);
    }
  };

  return (
    <div>
      {images.map((_, index) => (
        <div key={index} className="mb-10">
          <input
            className="w-10/12"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, index)}
          />
          <button
            type="button"
            onClick={() => removeImageInput(index)}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            -
          </button>
          {previews[index] && (
            <img
              src={previews[index]}
              alt={`Preview ${index + 1}`}
              width={100}
            />
          )}
        </div>
      ))}
      <Button type="button" onClick={addImageInput}>
        Tambah Gambar
      </Button>
      <small className="italic text-red-500">{isMessage}</small>
    </div>
  );
}
