import React from "react";
import { useState } from "react";
import { useFormContext } from "../../FormContext";

const InputField = ({ schema }) => {
  const { updateFormData } = useFormContext();

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    updateFormData(schema.jsonKey, newValue);
  };

  return (
    <>
      <div
        isRequired={schema?.validate?.required}
        isDisabled={schema.disable}
        key={schema.jsonKey}
      >
        <div className="my-2 font-bold relative flex">
          {schema?.label} <span className="text-red-600 ml-1">*</span>
          {schema?.description?.length > 0 && (
            <div className="group relative">
              <span className="ml-2 bg-slate-300 font-semibold px-2 border rounded-full border-gray-300 group-hover:hidden">
                i
              </span>
              <div className="absolute hidden group-hover:block bg-white text-black p-2 rounded-md shadow-md border border-gray-300">
                {schema.description}
              </div>
            </div>
          )}
        </div>
        <input
          className="w-full py-2 pl-3 pr-3 rounded-lg border-1 border-blue-200"
          value={value}
          onChange={handleChange}
          placeholder={schema.placeholder}
          name={schema?.jsonKey ? schema.jsonKey : ""}
          required={schema?.validate?.required}
        />
      </div>
    </>
  );
};

export default InputField;
