import React from "react";
import Ads from "../../components/Ads";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import NewArrival from "../../components/NewArrival";
import FeaturedProducts from "../../components/FeaturedProducts";
import Categories from "../../components/Categories";
import LikedProducts from "../../components/LikedProducts";
import Ideas from "../../components/Ideas";
import CheckPayment from "../order/CheckPayment";

const HomePage = () => {
  const fullUrl = window.location.href;
  const order_id1 = fullUrl.split('orderId=');
  let order_id = order_id1[1];
  if (order_id === null) {
    order_id = "";
  }
  let content = (
    <>
      <Banner />
      <Features />
      <NewArrival />
      <Ideas />
      <LikedProducts />
      {/* <Ads /> */}
      <Categories />
      <FeaturedProducts />
    </>
  )
  let order = (
      <CheckPayment order_id={order_id} />
  )
if (order_id && order_id.length > 0 && fullUrl.includes('orderId=')) {
  return window.location.href = "/#/order/check-payment/" + order_id;
}else{
  return content
}

};

export default HomePage;
