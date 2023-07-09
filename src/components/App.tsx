import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./about/About";
import Navbar from "./navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
