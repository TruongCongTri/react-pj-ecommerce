import React from "react";
import { Route, Routes  } from "react-router-dom";

import Home from "./Home";
import Dashboard from "./admin/AdminHome";
import DashboardCategories from "./admin/categories/DashboardCategories";
import ReadCategory from "./admin/categories/ReadCategory";
import CreateCategory from "./admin/categories/CreateCategory";
import UpdateCategory from "./admin/categories/UpdateCategory";

import DashboardProducts from "./admin/products/DashboardProducts";
import ReadProduct from "./admin/products/ReadProduct";
import CreateProduct from "./admin/products/CreateProduct";
import UpdateProduct from "./admin/products/UpdateProduct";

import OrdersDashboard from "./admin/orders/OrdersDashboard";

import CustomersDashboard from "./admin/customers/CustomersDashboard";

import SellerDashboard from "./admin/seller/SellerDashboard";

import AnalyticsDashboard from "./admin/analytics/AnalyticsDashboard";

import UserError from "./errors/UserError";

export default function Index() {
  return (
    <Routes>
      
      {/* user */}
      <Route index element={<Home />}  />
      <Route path="/" element={<Home />} breadcrumb="Home" />

      {/* admin */}
      <Route path="/admin">
        <Route index element={<Dashboard />} breadcrumb="Dashboard" />
        <Route path="categories">
          <Route index element={<DashboardCategories />} breadcrumb="Categories" />
          <Route path="add" element={<CreateCategory />} />
          <Route path=":id" element={<ReadCategory />} />
          
        </Route>

        <Route path="products">
          <Route index element={<DashboardProducts />} breadcrumb="Products" />
          <Route path="add" element={<CreateProduct />}  breadcrumb="Add Product" />
          <Route path=":id" element={<ReadProduct />} />
        </Route>

        <Route path="orders">
          <Route index element={<OrdersDashboard />} breadcrumb="we have orders"/>
        </Route>
        <Route path="customers">
          <Route index element={<CustomersDashboard />} />
        </Route>
        <Route path="seller">
          <Route index element={<SellerDashboard />} />
        </Route>
        <Route path="analytics">
          <Route index element={<AnalyticsDashboard />} />
        </Route>


      </Route>
      <Route path="*" element={<UserError />} />
      

 </Routes>
  );
}
