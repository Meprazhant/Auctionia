import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./UserContext.js";
import Bids from "./pages/Bids";
import Bidpage from "./pages/Bidpage";
import CreateBid from "./pages/CreateBid";
import EditBid from "./pages/EditBid";
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bids" element={<Bids />} />
          <Route path="/b/:id" element={<Bidpage />} />
          <Route path="/create" element={<CreateBid />} />
          <Route path="/edit/:id" element={<EditBid />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
