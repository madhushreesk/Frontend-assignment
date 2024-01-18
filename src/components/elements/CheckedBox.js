import React, { useEffect, useState } from "react";
import { useFormContext } from "../../FormContext";

const CheckedBox = ({ schema }) => {
  const { updateFormData } = useFormContext();
  const [isChecked, setIsChecked] = useState(schema.validate.defaultValue);

  useEffect(() => {
    updateFormData(schema.jsonKey, schema.validate.defaultValue);
  }, []);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    updateFormData(schema.jsonKey, event.target.checked);
  };
  return (
    <>
      <div className="mt-2" isRequired={schema.validate.required}>
        <div className="flex">
          <input
            id={schema.jsonKey}
            type="checkbox"
            checked={isChecked}
            onChange={(event) => handleChange(event)}
            isDisabled={schema.validate.immutable}
          />
          <div className="my-2 font-bold relative flex ml-2">
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
        </div>
      </div>
    </>
  );
};

export default CheckedBox;
