import React from 'react'
import { Navigate } from 'react-router-dom'


// nhận vào component children
// 
export default function ProtectedRoute({ isAuthenticate, children   }) {

    if (!isAuthenticate) {
        // người dùng chưa đăng nhập
        return <Navigate to="/login"></Navigate>;
    }
    // người dùng đã đăng nhập thì trả về trang children
  return children;
}
