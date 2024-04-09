import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Router>
          <Routes>
            <Route path="/" element={<Page1 />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
