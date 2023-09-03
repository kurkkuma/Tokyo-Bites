import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./about/About";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Favorite from "./favorite/Favorite";
import Profile from "./profile/Profile";
import Menu from "./menu/Menu";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
