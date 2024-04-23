import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import TransactionList from "./pages/transactionList/TransactionList";
import Product from "./pages/product/Product";
import Transaction from "./pages/transaction/Transaction";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkTokenExpiration } from "./redux/apiCalls";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const token = user?.access_token;

    useEffect(() => {
      if (user) {
        dispatch(checkTokenExpiration(token));
      }
    }, [dispatch, token]);

    return user ? children : <Navigate to="/login" />;
  };

  const Container = ({ children }) => {
    return (
      <>
        <Topbar />
        <div className="container">
          <Sidebar />
          {children}
        </div>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Container>
                <Home />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Container>
                <UserList />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <ProtectedRoute>
              <Container>
                <User />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/newuser"
          element={
            <ProtectedRoute>
              <Container>
                <NewUser />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Container>
                <ProductList />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProtectedRoute>
              <Container>
                <Product />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/newproduct"
          element={
            <ProtectedRoute>
              <Container>
                <NewProduct />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Container>
                <TransactionList />
              </Container>
            </ProtectedRoute>
          }
        />
           <Route
          path="/transaction/:transactionId"
          element={
            <ProtectedRoute>
              <Container>
                <Transaction />
              </Container>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
