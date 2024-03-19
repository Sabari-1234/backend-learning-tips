import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from './pages/LogIn.js';



function App() {
  return (

   <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
      
    </Routes>
   </BrowserRouter>
  );
}

export default App;