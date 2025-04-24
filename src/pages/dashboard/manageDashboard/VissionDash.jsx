import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ButtonDashboard } from "./ButtonDashboard";

export const VissionDash = () => {
  const editorInput = useRef();

  const [description, setDescription] = useState("");
  const [debounceDescription] = useDebounce(description, 800);

  const [editContent, setEditContent] = useState(false);

  const handleEdit = () => {
    setEditContent(!editContent);
  };

  return (
    <div className="rounded-lg bg-white px-5 py-3">
      <div className="mb-5 flex justify-end">
        {!editContent ? (
          <ButtonDashboard onClick={handleEdit}>Edit</ButtonDashboard>
        ) : (
          <ButtonDashboard onClick={handleEdit}>Simpan</ButtonDashboard>
        )}
      </div>
      {!editContent ? (
        <div className="break-words leading-relaxed text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium.
          asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        </div>
      ) : (
        <JoditEditor
          ref={editorInput}
          value={debounceDescription}
          onChange={(newContent) => setDescription(newContent)}
          // disabled={isLoading}
        />
      )}
    </div>
  );
};
