import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from './pages/LogIn.js';
import Login1 from "./pages/Login1";


function App() {
  return (

   <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login1/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;