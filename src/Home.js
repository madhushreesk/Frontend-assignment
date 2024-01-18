import { useState } from "react";
import { useFormContext } from "./FormContext";
import DynamicForm from "./components/DynamicForm";
import Header from "./components/Header";

const Home = () => {
  const [inputValue, setInputValue] = useState();
  const [formSchema, setFormSchema] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    try {
      const parsedFields = JSON.parse(e.target.value);
      if (Array.isArray(parsedFields)) {
        setFormSchema(parsedFields);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { handleResetData } = useFormContext();

  const handleReset = () => {
    setFormSchema([]);
    setInputValue("");
    handleResetData();
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-1/2 pr-10">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Paste UI schema here"
            className="m-3 bg-slate-300 w-full h-lvh rounded-lg p-2 text-gray-800 shadow-md"
          ></textarea>
        </div>

        <div className="w-1/2 pl-2">
          {formSchema.length > 0 && (
            <div className="1px border-r-4 p-1">
              <DynamicForm formSchema={formSchema} />

              <div className="flex justify-center items-center m-1">
                <div className="mt-3" onClick={handleReset}>
                  <button className="bg-blue-500 hover:bg-blue-600 px-2 py-2 font-bold text-white rounded-md">
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={6}>
        <GridItem {...leftSideStyles}>
          <Textarea
            value={inputValue}
            placeholder="Paste UI schema here"
            onChange={handleInputChange}
            height="100vh"
            resize="none"
            color="black"
            bg="gray.200"
            fontSize={"20px"}
          />
        </GridItem>

        <GridItem {...rightSideStyles}>
          {formSchema.length > 0 && (
            <>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <DynamicForm formSchema={formSchema} />
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "20px",
                  }}
                >
                  <Button
                    Button
                    colorScheme="blue"
                    marginTop={"10px"}
                    onClick={handleReset}
                  >
                    Clear
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </GridItem>
      </Grid> */}
    </>
  );
};

export default Home;
