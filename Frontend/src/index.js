
import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";


import Home from "views/pages/Home.js";
import Login from "views/pages/Login.js";
import Register from "views/pages/Register.js";
import SingleBlog from "views/pages/SingleBlog.js";
import Recipe from "views/pages/Recipe.js";
import CreatePost from "views/pages/CreatePost.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/create" exact element={<CreatePost />} />
      <Route path="/blog/*" exact element={<SingleBlog />} />
      <Route path="/recipe/*" exact element={<Recipe />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
