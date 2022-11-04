import axios from "axios";

const API_URL = "http://localhost:8080/";

const createProduct = (product) => {
    const { productname, price, stock, description } = {...product};
    return axios.post(API_URL + "addproduct", {
        productname,
        price,
        stock,
        description
    });
  };

const getAllProducts = () => {
  return axios.get(API_URL + "allproducts");
};

const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}deleteproduct/${productId}`);
};



const getEditProductDetail =(productId) => {
  return axios.get(`${API_URL}editproductdata/${productId}`);
};

const editProduct = (productData)=> {
  return axios.get(`${API_URL}editproduct/${productData.productId}`);
}



const ProductService = {
  createProduct,getAllProducts, deleteProduct, getEditProductDetail,editProduct
  }
  
  export default ProductService;