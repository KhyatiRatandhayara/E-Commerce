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
    description: "",
  });

  const productChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const productSubmitHandler = (e) => {
    e.preventDefault();
    ProductService.createProduct(product).then((response) => {
      navigate("/products");
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="pageheading d-flex align-items-center justify-content-center mb-4">
        Add Product
      </h2>
      <form
        onSubmit={productSubmitHandler}
        enctype="multipart/form-data"
        method="post"
      >
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
              <div class="file has-name">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume" />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Choose a file…</span>
                  </span>
                  <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
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
