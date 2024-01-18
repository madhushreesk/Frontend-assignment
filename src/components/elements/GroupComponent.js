import React, { useEffect, useState } from "react";

import Select from "./Select";
import { useFormContext } from "../../FormContext";
import CheckedBox from "./CheckedBox";
import InputField from "./InputField";

const FormComponent = ({ schema }) => {
  const { updateFormData } = useFormContext();

  useEffect(() => {
    updateFormData(
      schema.jsonKey,
      schema.subParameters[0].validate.defaultValue
    );
  }, []);

  const [selectedTab, setSelectedTab] = useState(
    schema.subParameters[0].validate.defaultValue
  );

  const handleTabChange = (tabValue) => {
    setSelectedTab(tabValue);
    updateFormData(schema.jsonKey, tabValue);
  };

  const renderRadioButtons = (field) => {
    if (field.uiType === "Radio") {
      return (
        <div isRequired={field?.validate?.required}>
          <button
            size="sm"
            isAttached
            variant="outline"
            value={selectedTab}
            onChange={(value) => handleTabChange(value)}
          >
            <div>
              {field?.validate?.options.map((option) => (
                <button
                  className={`mr-2 border-1 shadow-md border-blue-200 rounded-md p-2 ${
                    selectedTab === option.value
                      ? "border-gray-500 text-gray-500 font-bold"
                      : ""
                  }`}
                  key={option.value}
                  onClick={() => handleTabChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </button>
        </div>
      );
    }
  };

  const renderSubParameters = (fields) => {
    return fields.map((schema) => {
      if (schema.uiType === "Ignore") {
        if (
          schema.conditions.some(
            (condition) =>
              condition.jsonKey === `pizza_type.type` &&
              condition.op === "==" &&
              condition.value === selectedTab &&
              condition.action === "enable"
          )
        ) {
          return renderSubParameters(schema.subParameters);
        }
      } else if (schema.uiType === "Select") {
        return <Select schema={schema} />;
      } else if (schema.uiType === "Input") {
        return <InputField schema={schema} />;
      } else if (schema.uiType === "Switch") {
        return <CheckedBox schema={schema} />;
      }

      return null;
    });
  };

  return (
    <div>
      <div className="font-bold my-2">{schema.label}</div>
      {schema.subParameters.map((field) => renderRadioButtons(field))}
      {renderSubParameters(schema.subParameters)}
    </div>
  );
};

export default FormComponent;
