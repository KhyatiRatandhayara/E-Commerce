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

const ProductService = {
  createProduct
  }
  
  export default ProductService;