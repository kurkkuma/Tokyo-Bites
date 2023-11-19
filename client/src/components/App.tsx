import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import About from "./about/About";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Favorite from "./favorite/Favorite";
import Profile from "./profile/Profile";
import Menu from "./menu/Menu";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
