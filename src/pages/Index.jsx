import React from "react";
import { Route, Routes  } from "react-router-dom";

import Home from "./Home";
import Dashboard from "./admin/AdminHome";
import DashboardCategories from "./admin/categories/DashboardCategories";
import ReadCategory from "./admin/categories/ReadCategory";
import CreateCategory from "./admin/categories/CreateCategory";
import EditCategory from "./admin/categories/EditCategory";

import DashboardProducts from "./admin/products/DashboardProducts";
import ReadProduct from "./admin/products/ReadProduct";
import CreateProduct from "./admin/products/CreateProduct";
import EditProduct from "./admin/products/EditProduct";

import OrdersDashboard from "./admin/orders/OrdersDashboard";

import DashboardCustomers from "./admin/customers/DashboardCustomers";
import ReadCustomer from "./admin/customers/ReadCustomer";
import CreateCustomer from "./admin/customers/CreateCustomer";
import EditCustomer from "./admin/customers/EditCustomer";

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
          <Route path=":id/edit" element={<EditCategory />} />
          
        </Route>

        {/* <Route path="products">
          <Route index element={<DashboardProducts />} breadcrumb="Products" />
          <Route path="add" element={<CreateProduct />}  breadcrumb="Add Product" />
          <Route path=":id" element={<ReadProduct />} breadcrumb="Product Detail"/>
          <Route path=":id/edit" element={<EditProduct />} breadcrumb="Edit Product"/>
        </Route> */}
          <Route path="products" element={<DashboardProducts />} breadcrumb="Products" />
          <Route path="products/add" element={<CreateProduct />}  breadcrumb="Add Product" />
          <Route path="products/:id" element={<ReadProduct />} breadcrumb="Product Detail"/>
          <Route path="products/:id/edit" element={<EditProduct />} breadcrumb="Edit Product"/>
        

        <Route path="orders">
          <Route index element={<OrdersDashboard />} breadcrumb="we have orders"/>
        </Route>

        <Route path="customers">
          <Route index element={<DashboardCustomers />} breadcrumb="Customers" />
          <Route path="add" element={<CreateCustomer />}  breadcrumb="Add Customer" />
          <Route path=":id" element={<ReadCustomer />} breadcrumb="Customer Detail"/>
          <Route path=":id/edit" element={<EditCustomer />} breadcrumb="Edit Customer"/>
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
