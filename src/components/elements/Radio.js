import React, { useEffect, useState } from "react";
import { useFormContext } from "../../FormContext";

const RadioField = ({ schema }) => {
  const { updateFormData } = useFormContext();
  useEffect(() => {
    updateFormData(schema.jsonKey, schema.validate.defaultValue);
  }, [schema.jsonKey, schema.validate.defaultValue, updateFormData]);

  const [selectedTab, setSelectedTab] = useState(schema.validate.defaultValue);

  const handleTabChange = (tabValue) => {
    setSelectedTab(tabValue);
    updateFormData(schema.jsonKey, tabValue);
  };

  return (
    <div className="mt-2" isRequired={schema.required} key={schema.jsonKey}>
      <div>
        {schema.label}
        {schema.description && (
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

      <button
        size="sm"
        isAttached
        variant="outline"
        value={selectedTab}
        onChange={(value) => handleTabChange(value)}
      >
        <div>
          {schema.validate.options.map((option) => (
            <button
              key={option.value}
              id={option.value}
              onClick={() => handleTabChange(option.value)}
              colorScheme={selectedTab === option.value ? "blue" : "gray"}
            >
              {option.label}
            </button>
          ))}
        </div>
      </button>
    </div>
  );
};

export default RadioField;
