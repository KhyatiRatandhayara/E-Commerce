import './App.css';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {HomePage} from "./components/HomePage.js";
import { Header } from './components/Layout/Header';
import { Register } from './components/Register';
import { Login } from './components/Login';

function App() {
  return (
      // <div className="container mt-3">
      <BrowserRouter>
      <Header />
       <Routes>
          <Route exact path={"/"} element={<HomePage />} />
          <Route exact path="/register" element={<Register/>} /> 
          <Route exact path="/login" element={<Login/>} /> 
        </Routes>
        </BrowserRouter>
      // </div>
    )
}

export default App;
