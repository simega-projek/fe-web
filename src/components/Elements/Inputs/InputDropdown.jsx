import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

const InputDropdown = ({ data, id, type = "text" }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [debounce] = useDebounce(filteredData, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div className="relative">
      <TextInput
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        id={id}
      />
      {debounce.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto border bg-white">
          {debounce.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setInputValue(item);
                setFilteredData([]);
              }}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
