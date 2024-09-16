import { Button } from "flowbite-react";
import React, { useState } from "react";

export const InputMany = ({
  typeInput: TypeInput,
  type = "text",
  id,
  value,
  onChange,
}) => {
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);

  const handleIncrementInput = () => {
    setInputs([...inputs, { id: inputs.length + 1, value: "" }]);
  };
  const handleDecrementInput = () => {
    if (inputs.length > 1) {
      setInputs(inputs.slice(0, -1));
    }
  };

  const handleInputChange = (id, value) => {
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, value } : input)),
    );
  };

  return (
    <div>
      {inputs.map((input) => (
        <TypeInput
          autoFocus
          key={input.id}
          className="mb-2 w-full"
          type={type}
          id={id}
          value={input.value}
          onChange={(e) => handleInputChange(input.id, e.target.value)}
          sizing="md"
        />
      ))}
      <div className="flex gap-2">
        <Button onClick={handleIncrementInput}>+</Button>
        <Button
          onClick={handleDecrementInput}
          className={`${inputs.length === 1 ? "hidden" : "block"}`}
        >
          -
        </Button>
      </div>
    </div>
  );
};
