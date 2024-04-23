import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkTokenExpiration } from "./redux/apiCalls";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.access_token;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(checkTokenExpiration(token));
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to={"/login"} /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
