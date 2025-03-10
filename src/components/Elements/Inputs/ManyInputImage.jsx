// import { Button } from "flowbite-react";
// import React, { useState } from "react";

// export default function ManyInputImage({ onImagesChange }) {
//   // Tambahkan props
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [isMessage, setIsMessage] = useState("");

//   // Handle adding new image input field
//   const addImageInput = () => {
//     if (images.some((image) => image === null)) {
//       setIsMessage("Isi gambar terlebih dahulu");
//       return;
//     } else {
//       setIsMessage("");
//       setImages([...images, null]);
//       setPreviews([...previews, null]);
//     }
//   };

//   // Handle removing an image input field
//   const removeImageInput = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     const updatedPreviews = previews.filter((_, i) => i !== index);
//     setImages(updatedImages);
//     setPreviews(updatedPreviews);
//     onImagesChange(updatedImages); // Update state di komponen induk
//   };

//   // Handle image file change and update the preview
//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const updatedImages = [...images];
//       updatedImages[index] = file;
//       setImages(updatedImages);
//       onImagesChange(updatedImages); // Kirim data ke komponen induk

//       const updatedPreviews = [...previews];
//       updatedPreviews[index] = URL.createObjectURL(file);
//       setPreviews(updatedPreviews);
//     }
//   };

//   return (
//     <div>
//       {images.map((_, index) => (
//         <div key={index} className="mb-10">
//           <input
//             className="w-10/12"
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, index)}
//           />
//           <button
//             type="button"
//             onClick={() => removeImageInput(index)}
//             className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
//           >
//             -
//           </button>
//           {previews[index] && (
//             <img
//               src={previews[index]}
//               alt={`Preview ${index + 1}`}
//               width={100}
//             />
//           )}
//         </div>
//       ))}
//       <Button type="button" onClick={addImageInput}>
//         Tambah Gambar
//       </Button>
//       <small className="italic text-red-500">{isMessage}</small>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Button } from "flowbite-react";
import Draggable from "react-draggable";

export default function ManyInputImage({ onImagesChange }) {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isMessage, setIsMessage] = useState("");

  // Handle adding new image input field
  const addImageInput = () => {
    setImages([...images, null]);
    setPreviews([...previews, null]);
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

  // Handle drag and drop for images
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    const reorderedPreviews = Array.from(previews);
    const [removedPreview] = reorderedPreviews.splice(result.source.index, 1);
    reorderedPreviews.splice(result.destination.index, 0, removedPreview);

    setImages(reorderedImages);
    setPreviews(reorderedPreviews);
    onImagesChange(reorderedImages); // Update state di komponen induk
  };

  return (
    <div>
      <Button type="button" onClick={addImageInput}>
        Tambah Gambar
      </Button>
      <small className="italic text-red-500">{isMessage}</small>

      <Droppable droppableId="droppable-images">
        {(provided) => (
          <div
            className="mt-5"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {images.map((_, index) => (
              <Draggable
                key={index}
                draggableId={`draggable-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-10 flex items-center"
                  >
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
                      Hapus
                    </button>
                    {previews[index] && (
                      <img
                        src={previews[index]}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        className="ml-2"
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
