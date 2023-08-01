import "./index.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Errorpage from "./pages/Errorpage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";
import MainHomePage from "./pages/MainHomePage";
import CategoryProduct from "./pages/CategoryProduct";
import PageCart from "./pages/PageCart";
import AdminOrders from "./pages/Admin/AdminOrders";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  return (
    <>
      <div className="m-3 ">
        <Router>
          <Header />
          <Routes>
            <Route path="/products" element={<Home />} />
            <Route
              path="/products/product/:slug"
              element={<ProductDetails />}
            />
            <Route path="/" element={<MainHomePage />} />
            <Route path="/cart" element={<PageCart />} />
            <Route path="/category/:slug" element={<CategoryProduct />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/orders" element={<Orders />} />
              <Route path="user/profile" element={<Profile />} />
            </Route>
            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/product/:slug" element={<UpdateProduct />} />

              <Route path="admin/users" element={<Users />} />
              <Route path="admin/orders" element={<AdminOrders />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
          <Footer />
        </Router>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
