import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import ProductService from "../../services/product.service";
export const EditForm = ({productDetails}) => {

    console.log(productDetails);
    const onChangeHandler = (e) => {
          console.log(e.target.value);
    }
    return (
        <form>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <div className="field">
              <label className="label">Product Name: </label>
              <input
                className="input"
                type="text"
                name="productname"
                value={productDetails.name}
                onChange= {onChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Price: </label>
              <input
                className="input"
                type="number"
                name="price"
                value={productDetails.price}
                onChange= {onChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Available in Stock: </label>
              <input
                className="input"
                type="number"
                name="stock"
                value={productDetails.stock}
                onChange= {onChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Description: </label>
              <textarea
                className="textarea"
                type="text"
                rows="2"
                style={{ resize: "none" }}
                name="description"
                value={productDetails.description}
                onChange= {onChangeHandler}
              />
            </div>
            <div className="field is-clearfix">
            <Button type="submit" variant="secondary">Edit</Button>
            </div>
          </div>
        </div>
      </form>
    );
}
