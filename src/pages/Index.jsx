import React, {useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";

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

import Login from "./authorization/Login";
import Register from "./authorization/Register";

import UserError from "./errors/UserError";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthenticateContext } from "../contexts/AuthenticateContext";


import SnackBar from "../components/layouts/SnackBar";
import NotiProvider from "../contexts/NotiContext";
import Sidebar from "../components/layouts/admin/Sidebar";
import Header from "../components/layouts/admin/Header";
export default function Index() {
  // const [isAuthenticate, setIsAuthenticate] = useState(localStorage.getItem("token"))
    const { isAuthenticate } = useContext(AuthenticateContext);
  return (
    <Routes>
      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* user */}
      <Route index element={<Home />} />
      <Route path="/" element={<Home />} breadcrumb="Home" />

      {/* admin */}

      <Route path="/admin">
        <Route
          index
          element={
            <ProtectedRoute isAuthenticate={isAuthenticate}>
              <Dashboard />
              </ProtectedRoute>
          }
          breadcrumb="Dashboard"
        />
        <Route path="categories">
          <Route
            index
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <DashboardCategories />
              </ProtectedRoute>
            }
            breadcrumb="Categories"
          />
          <Route
            path="add"
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <CreateCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <ReadCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id/edit"
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <EditCategory />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* <Route path="products">
          <Route index element={<DashboardProducts />} breadcrumb="Products" />
          <Route path="add" element={<CreateProduct />}  breadcrumb="Add Product" />
          <Route path=":id" element={<ReadProduct />} breadcrumb="Product Detail"/>
          <Route path=":id/edit" element={<EditProduct />} breadcrumb="Edit Product"/>
        </Route> */}

        <Route
          path="products"
          element={
            <ProtectedRoute isAuthenticate={isAuthenticate}>
              <DashboardProducts />
            </ProtectedRoute>
          }
          breadcrumb="Products"
        />
        <Route
          path="products/add"
          element={
            <ProtectedRoute isAuthenticate={isAuthenticate}>
              <CreateProduct />
            </ProtectedRoute>
          }
          breadcrumb="Add Product"
        />
        <Route
          path="products/:id"
          element={
            <ProtectedRoute isAuthenticate={isAuthenticate}>
              <ReadProduct />
            </ProtectedRoute>
          }
          breadcrumb="Product Detail"
        />
        <Route
          path="products/:id/edit"
          element={
            <ProtectedRoute isAuthenticate={isAuthenticate}>
              <EditProduct />
            </ProtectedRoute>
          }
          breadcrumb="Edit Product"
        />

        <Route path="orders">
          <Route
            index
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <OrdersDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="customers">
          <Route
            index
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <DashboardCustomers />
              </ProtectedRoute>
            }
            breadcrumb="Customers"
          />
          <Route
            path="add"
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <CreateCustomer />
              </ProtectedRoute>
            }
            breadcrumb="Add Customer"
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <ReadCustomer />
              </ProtectedRoute>
            }
            breadcrumb="Customer Detail"
          />
          <Route
            path=":id/edit"
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <EditCustomer />
              </ProtectedRoute>
            }
            breadcrumb="Edit Customer"
          />
        </Route>

        <Route path="seller">
          <Route
            index
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="analytics">
          <Route
            index
            element={
              <ProtectedRoute isAuthenticate={isAuthenticate}>
                <AnalyticsDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>


      <Route path="*" element={<UserError />} />
    </Routes>
  );
}
