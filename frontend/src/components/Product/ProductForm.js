import "./ProductForm.css";

import ProductService from "../../services/product.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productname: "",
    price: "",
    stock: "",
    productfile : "",
    description: "",
  });
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


  const productChangeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const productImageChangeHandler = (e) => {
    setProduct({
      ...product,
      productfile : e.target.files[0],
    });
  };
  const validationHandler = () => {
    if (!product.productname) {
      setSuccessful(false);
      setMessage('Please enter Product Name!');
      return false;
    }
    if (product.productname.length < 3 ||product.productname.length > 20) {
      setSuccessful(false);
      setMessage("The productname must be between 3 and 20 characters.");
      return false;
    }
    if (!product.price) {
      setSuccessful(false);
      setMessage('Please enter Product price!');
      return false;
    }
    if (!product.stock) {
      setSuccessful(false);
      setMessage('Please enter available stock count for the product!');
      return false;
    }
    if (!product.productfile) {
      setSuccessful(false);
      setMessage('Please upload Product Image!');
      return false;
    }
    return true;
  }
  const productSubmitHandler = (e) => {
    e.preventDefault();
    const isValid = validationHandler();
    if(isValid){
      let formData = new FormData();
      formData.append('file', product.productfile)
      formData.append('productname', product.productname)
      formData.append('price', product.price)
      formData.append('stock', product.stock)
      formData.append('description', product.description)
     
      ProductService.createProduct(formData).then(
        (response) => {
          setSuccessful(true);
        navigate("/products");
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString() ;
          setMessage(resMessage);
          setSuccessful(false);
      });
    }
  };

  return (
   
    <div className="container mt-3">
      <h2 className="pageheading d-flex align-items-center justify-content-center mb-4">
        Add Product
      </h2>
      <form
        onSubmit={productSubmitHandler}
        encType="multipart/form-data"
        method="post"
      >
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Product Name: </label>
              <input
                className="input"
                type="text"
                name="productname"
                value={product.productname}
                onChange={productChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Price: </label>
              <input
                className="input"
                type="number"
                name="price"
                value={product.price}
                onChange={productChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Available in Stock: </label>
              <input
                className="input"
                type="number"
                name="stock"
                value={product.stock}
                onChange={productChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Product Image: </label>
              <div className="file has-name">
                <label className="file-label">
                  <input className="file-input" type="file" name="productfile" onChange={productImageChangeHandler}/>
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                  <span className="file-name">
                  {product.productfile.name}
                  </span>
                </label>
              </div>
            </div>
            {/* <div className="field">
                <label className="label">Short Description: </label>
                <input
                  className="input"
                  type="text"
                  name="shortDesc"
                />
              </div> */}
            <div className="field">
              <label className="label">Description: </label>
              <textarea
                className="textarea"
                type="text"
                rows="2"
                style={{ resize: "none" }}
                name="description"
                value={product.description}
                onChange={productChangeHandler}
              />
            </div>
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
