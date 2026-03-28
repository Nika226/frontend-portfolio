import "./App.css";
import Footer from "./components/Footer/index.jsx";
import Navbar from "./components/Navbar/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage/index.jsx";
import Categories from "./pages/Categories/index.jsx";
import Allproducts from "./pages/Allproducts/index.jsx";
import Allsales from "./pages/Allsales/index.jsx";
import Product from "./pages/Product/index.jsx";
import Cart from "./pages/Cart/index.jsx";
import LoginSignup from "./pages/LoginSignup/index.jsx";
import PageNotFound from "./pages/PageNotFound/index.jsx";
import CategoryProducts from "./pages/CategoryProducts/index.jsx";
import ProductCard from "./pages/ProductCard/index.jsx";
import ShoppingCart from "./pages/Cart/index.jsx";
import BackToTopButton from "./components/BackToTopButton/index.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/allsales" element={<Allsales />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          <Route path="/products/:id" element={<ProductCard />} />
          <Route path="product/" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shoppingCart/:id" element={<ShoppingCart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            render={({ location }) => location.pathname !== "*" && <Footer />}
          />
        </Routes>

        <Footer />
        <BackToTopButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
