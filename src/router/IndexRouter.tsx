import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/login/Login";
import Books from "../views/sandbox/books/Books";
import BooksSandBox from "../views/sandbox/BooksSandBox";
import Signup from "../views/signup/Signup";
// import Register from "../views/signup/signup";
export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/books"  element={localStorage.getItem('token') ? <Books/> :<Books/>} /> */}
        <Route path="*" element={<BooksSandBox />} />
        {/* <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
