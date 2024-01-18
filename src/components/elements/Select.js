import React, { useEffect } from "react";
import { useFormContext } from "../../FormContext";

const SelectField = ({ schema }) => {
  const { updateFormData } = useFormContext();
  const [selectedValue, setSelectedValue] = React.useState(
    schema.validate.defaultValue
  );
  useEffect(() => {
    updateFormData(schema.jsonKey, schema.validate.defaultValue);
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    updateFormData(schema.jsonKey, newValue);
  };

  return (
    <div isRequired={schema.validate.required} className="my-2">
      <div className="font-bold my-2" htmlFor={schema.jsonKey}>
        {schema.label} <span className="text-red-600">*</span>
      </div>

      <select
        className="w-full py-2 pl-3 pr-3 rounded-lg border-1 border-blue-200"
        id={schema.jsonKey}
        value={selectedValue}
        onChange={handleChange}
        isDisabled={schema.validate.immutable}
        placeholder={schema.placeholder}
      >
        {schema.validate.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
