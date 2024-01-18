import React from "react";

import { FormContextProvider } from "./FormContext.js";
import Home from "./Home.js";
const App = () => {
  return (
    <>
      <FormContextProvider>
        <Home />
      </FormContextProvider>
    </>
  );
};

export default App;
