import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../views/login/Login";
import Books from "../views/sandbox/books/Books";
import BooksSandBox from "../views/sandbox/BooksSandBox";
import MyReviews from "../views/sandbox/my-reviews/MyReviews";
import Profile from "../views/sandbox/profile/Profile";
import ReviewDetail from "../views/sandbox/review-detail/ReviewDetail";
import Signup from "../views/signup/Signup";
// import Register from "../views/signup/signup";
export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AuthComponent><BooksSandBox /></AuthComponent>}>
          <Route index element={<AuthComponent><Books/></AuthComponent>} />
          <Route path="/books" element={<AuthComponent><Books/></AuthComponent>} />
          <Route path="/my" element={<AuthComponent><MyReviews /></AuthComponent>} />
          <Route path="/detail/:id" element={<AuthComponent><ReviewDetail /></AuthComponent>} />
          <Route path="/detail" element={<Navigate to={'/'} />} />          
          <Route path="/profile" element={<AuthComponent><Profile /></AuthComponent>} />
        </Route>
        <Route path="*" element={<div>404 NotFound</div>} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthComponent(props:any) {
  return localStorage.getItem("token") ? props.children : <Navigate to={'/login'} />;
}
