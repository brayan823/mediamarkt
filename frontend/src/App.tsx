import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Form from "./components/Form/Form";

import routes from "./utils/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.landing} element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
