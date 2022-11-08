import axios from "axios";

const API_URL = "http://localhost:8080/";

const createProduct = (formData) => {

//   for (var key of formData.entries()) {
//     console.log(key[0] + ', ' + key[1]);
// }

  const headers = {
    "Content-Type": "multipart/form-data" 
  }
  return axios.post(API_URL + "addproduct",formData,{
    headers: headers
  });
};

const getAllProducts = () => {
  return axios.get(API_URL + "allproducts");
};

const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}deleteproduct/${productId}`);
};

const getEditProductDetail = (productId) => {
  return axios.get(`${API_URL}editproductdata/${productId}`);
};

const editProduct = (productData) => {
  return axios
    .put(`${API_URL}editproduct/${productData.productId}`, productData)
    .then((response) => {
      return response.data;
    });
};

const productAddToCart = (productId) => {
    return axios.post(API_URL + "addtocart",productId);
  };

  const getAllCartData = (userData) => {
    return axios.post(API_URL + "getcartdata",userData);
  };

const ProductService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getEditProductDetail,
  editProduct,
  productAddToCart,
  getAllCartData
};

export default ProductService;
