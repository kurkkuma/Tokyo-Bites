import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import About from "./about/About";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Favorite from "./favorite/Favorite";
import Profile from "./profile/Profile";
import Menu from "./menu/Menu";
import Basket from "./basket/Basket";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { loadProducts } from "../store/productSlice";
import { useGetProductsQuery } from "../store/api/productsApi";

function App() {
  const { data = [] } = useGetProductsQuery({});
  const productsDispatch = useAppDispatch();
  useEffect(() => {
    if (data.length > 0) {
      productsDispatch(loadProducts(data));
    }
  }, [data, productsDispatch]);
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
        <Route path="/basket" element={<Basket />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
