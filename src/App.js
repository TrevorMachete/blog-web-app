import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";

import Header from "./components/Navbar/Header";
import Home from "./components/Home";
import Login from "./components/Authentication/Login";
import CreatePost from "./components/Posts/CreatePost";
import RecentPosts from "./components/Posts/RecentPosts";
import PostDetail from "./components/Posts/PostDetail";
import EditPost from "./components/Posts/EditPost";
import SignupScreen from "./components/Authentication/Signup";
import ForgotPasswordScreen from "./components/Authentication/ForgotPassword";
import ContactUs from "./components/Contact/ContactUs";
import AboutUs from "./components/AboutUs";
import Article from "./components/Article";

function App() {
  const [navVisible, setNavVisible] = useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Header navVisible={navVisible} setNavVisible={setNavVisible}/>
          <Routes>
            <Route path="/" element={<Home navVisible={navVisible}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/recent-posts" element={<RecentPosts />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
