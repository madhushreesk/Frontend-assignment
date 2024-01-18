import React, { useState } from "react";

import { useFormContext } from "../FormContext";
import Select from "./elements/Select";
import Radio from "./elements/Radio";
import GroupComponent from "./elements/GroupComponent";
import InputField from "./elements/InputField";
import CheckedBox from "./elements/CheckedBox";
import { Fragment } from "react";

const DynamicForm = ({ formSchema }) => {
  const { formData } = useFormContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isFormValid = formSchema.every((field) => {
      if (field.validate?.required) {
        return (
          formData[field.jsonKey] !== undefined &&
          formData[field.jsonKey] !== ""
        );
      }
      return true;
    });

    if (isFormValid) {
      handleOpenModal();
    } else {
      console.log("error");
    }
  };

  const renderJsonElements = (schema) => {
    return (
      <Fragment>
        {isModalOpen && (
          <div className="fixed inset-0">
            <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
              >
                <div className="bg-gray-200  py-3 sm:px-6 flex items-center justify-between">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-headline"
                  >
                    JSON Data
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                  >
                    &#10005;
                  </button>
                </div>
                <div className="bg-white  pt-3 sm:p-6 sm:pb-4">
                  <div className="flex justify-center items-center sm:flex">
                    <div>
                      {Object.entries(schema).map(([key, value]) => (
                        <p
                          key={key}
                          className="py-1 text-sm font-semibold text-gray-700"
                        >
                          <strong>{key}:</strong>
                          {JSON.stringify(value, null, 2)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <>
      <form>
        {formSchema.map((schema, index) => {
          return (
            <div key={index}>
              {schema.uiType === "Input" && (
                <InputField schema={schema} key={schema.sort} />
              )}

              {schema.uiType === "Switch" && (
                <CheckedBox schema={schema} key={schema.sort} />
              )}

              {schema.uiType === "Select" && (
                <Select schema={schema} key={schema.sort} />
              )}

              {schema.uiType === "Radio" && (
                <Radio schema={schema} key={schema.sort} />
              )}

              {schema.uiType === "Group" && (
                <GroupComponent schema={schema} key={schema.sort} />
              )}
            </div>
          );
        })}
        {formSchema.length > 0 && (
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 text-white py-2 px-3 mt-10 rounded-md font-bold"
              onClick={(e) => {
                handleFormSubmit(e);
              }}
            >
              Submit
            </button>
            {renderJsonElements(formData)}
          </div>
        )}
      </form>
    </>
  );
};

export default DynamicForm;
