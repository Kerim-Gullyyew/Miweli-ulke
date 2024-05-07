import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import DashLayout from "./layouts/DashLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Batch from "./pages/Batch";
import BatchDetail from "./pages/BatchDetail";
import Account from "./pages/Account";
import Stock from "./pages/Stock";
import CameraDetail from "./pages/CameraDetail";
import Product from "./pages/Product";
import Transfer from "./pages/Transfer";
import ProductDetail from "./pages/ProductDetail";
import { Select, initTE } from "tw-elements";
import TransferDetail from "./pages/TransferDetail";
import Move from "./pages/Move";
import MoveDetail from "./pages/MoveDetail";
import Reduce from "./pages/Reduce";
import ReduceDetail from "./pages/ReduceDetail";
import CellDetail from "./pages/CellDetail";



const App = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashLayout />}>
            <Route index element={<HomePage />} />

            <Route path="batch" element={<Batch />} />
            <Route path="batch/:id" element={<BatchDetail />} />

            <Route path="stock" element={<Stock />} />
            <Route path="camera/:id" element={<CameraDetail />} />
            <Route path="cell/:id" element={<CellDetail />} />


            <Route path="product" element={<Product />} />
            <Route path="product/:id" element={<ProductDetail />} />


            <Route path="transfer" element={<Transfer />} />
            <Route path="transfer/:id" element={<TransferDetail />} />

            <Route path="move" element={<Move />} />
            <Route path="move/:id" element={<MoveDetail />} />

            <Route path="reduce" element={<Reduce />} />
            <Route path="reduce/:id" element={<ReduceDetail />} />

            <Route path="account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
