import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import DashLayout from "./components/DashLayout";
import HomePage from "./features/homepage/HomePage";
import ShopList from "./features/shop/ShopList";
import WishList from "./features/account/WishList";
import Account from "./features/account/Account";
import Card from "./features/account/Card";
import About from "./features/about/About";
import Address from "./features/account/Address";
import AccountLayout from "./features/account/AccountLayout";
import CreateAdress from "./features/account/CreateAdress";
import EditAdress from "./features/account/EditAdress";
import EditProfile from "./features/account/EditProfile";
import PasswordReset from "./features/account/PasswordReset";
import OrderList from "./features/account/OrderList";
import Delivery from "./features/account/Delivery";
import Product from "./features/Product/Product";

import { useDispatch } from 'react-redux';
import { getInfo } from "./store/features/info/infoSlice";
import Privacy from "./features/privacy/Privacy";
import Brand from "./features/brand/Brand";
import Idea from "./features/idea/Idea";
import OrderCreate from "./features/order/OrderCreate";
import OrderDetail from "./features/account/OrderDetail";
import CheckPayment from "./features/order/CheckPayment";
import ScrollToTop from "./scrollToTop";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo())
  }, [dispatch]);

  useEffect(() => {
    const importTE = async () => {
      await import("tw-elements");
    };
    importTE();
  }, []);

  const [userLanguage] = useState();
  const lang = localStorage.getItem("userLanguage");

  if (lang == null || (lang !== "tm" && lang !== "ru")) {
    localStorage.setItem("userLanguage", userLanguage ? userLanguage : "tm");
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
      <Route path="/order/check-payment/:id" element={<CheckPayment />} />
        <Route path="/" element={<DashLayout />}>
          <Route index element={<HomePage />} />

          <Route path="shop">
            <Route index element={<ShopList />} />
          </Route>

          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="card" element={<Card />} />
            <Route path="address" element={<Address />} />
            <Route path="address/new" element={<CreateAdress />} />
            <Route path="address/:id" element={<EditAdress />} />
            <Route path="profile/:id" element={<EditProfile />} />
            <Route path="orderlist" element={<OrderList />} />
            <Route path="orderDetail/:id" element={<OrderDetail />} />
            <Route path="delivery" element={<Delivery />} />

            <Route path="passwordreset" element={<PasswordReset />} />
          </Route>

          <Route path="aboutUs" element={<About />} />

          <Route path="order/create" element={<OrderCreate />} />
          

          <Route path="privacy_policy" element={<Privacy />} />
          <Route path="brand" element={<Brand />} />

          <Route path="product/:id">
            <Route index element={<Product />} />
          </Route>

          <Route path="idea/:id">
            <Route index element={<Idea />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
