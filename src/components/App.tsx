import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./about/About";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Profile from "./profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
