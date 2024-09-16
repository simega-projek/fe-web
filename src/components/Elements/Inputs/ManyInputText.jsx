import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function ManyInputText({ onTextsChange, disabled, onReset }) {
  // Tambahkan props
  const [texts, setTexts] = useState([]);
  const [isMessage, setIsMessage] = useState("");

  const addTextInput = () => {
    if (texts.some((text) => text.trim() === "")) {
      setIsMessage("Isi link terlebih dahulu");
      return;
    } else {
      setIsMessage("");
      setTexts([...texts, ""]);
    }
  };

  const removeTextInput = (index) => {
    const updatedTexts = texts.filter((_, i) => i !== index);
    setTexts(updatedTexts);
    onTextsChange(updatedTexts); // Kirim data ke komponen induk
  };

  const handleTextChange = (e, index) => {
    const updatedTexts = [...texts];
    updatedTexts[index] = e.target.value;
    setTexts(updatedTexts);
    onTextsChange(updatedTexts); // Kirim data ke komponen induk
  };

  useEffect(() => {
    if (onReset) {
      setTexts([]);
      onTextsChange([]); // Reset data juga ke komponen induk
    }
  }, [onReset, onTextsChange]);

  return (
    <div>
      {texts.map((text, index) => (
        <div
          key={index}
          style={{ marginBottom: "10px" }}
          className="flex justify-between"
        >
          <TextInput
            className="mr-2 w-full"
            type="text"
            value={text}
            onChange={(e) => handleTextChange(e, index)}
            placeholder={`Link youtube video ${index + 1}`}
            disabled={disabled}
          />
          <button
            type="button"
            onClick={() => removeTextInput(index)}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            -
          </button>
        </div>
      ))}

      <Button type="button" onClick={addTextInput}>
        Tambah Link Video
      </Button>
      <small className="italic text-red-500">{isMessage}</small>
    </div>
  );
}