import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage} from "./components/SignupIn/HomePage";
import { Header } from './components/Layout/Header';
import { Register } from './components/SignupIn/Register';
import { Login } from './components/SignupIn/Login';
import { ProductItems } from './components/Product/ProductItems';
import { Profile } from './components/SignupIn/Profile';
import { ProductForm } from './components/Product/ProductForm';

function App() {
  const navigate = useNavigate();
  return (
      <BrowserRouter>
      <Header />
       <Routes>
          <Route exact path={"/"} element={<HomePage />} />
          <Route exact path="/register" element={<Register/>} /> 
          <Route exact path="/login" element={<Login/>} /> 
          <Route exact path="/products" element={<ProductItems/>} /> 
          <Route exact path="/profile" element={<Profile/>} /> 
          <Route exact path="/addproduct" element={<ProductForm/>} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;
