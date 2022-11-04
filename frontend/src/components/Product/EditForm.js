import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import ProductService from "../../services/product.service";
export const EditForm = ({productDetails,changeDataDeleteOrEdit, closeEditModal}) => {
  const [editProduct, setEditProduct] = useState({
    productId : productDetails.productId,
    productname: productDetails.productname,
    price: productDetails.price,
    stock: productDetails.stock,
    description: productDetails.description,
  });

    const onChangeHandler = (e) => {
      const {name, value} = e.target;
      setEditProduct({
        ...editProduct,
        [name] : value
      })
      
    }
    const editSubmitHandler = (e) => {
      e.preventDefault();
      ProductService.editProduct(editProduct).then((response) => {
        closeEditModal();
        changeDataDeleteOrEdit();
      });
    }
    return (
        <form onSubmit={editSubmitHandler}>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <div className="field">
              <label className="label">Product Name: </label>
              <input
                className="input"
                type="text"
                name="productname"
                value={editProduct.productname}
                onChange= {onChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Price: </label>
              <input
                className="input"
                type="number"
                name="price"
                value={editProduct.price}
                onChange= {onChangeHandler}
              />
            </div>
            <div className="field">
              <label className="label">Available in Stock: </label>
              <input
                className="input"
                type="number"
                name="stock"
                value={editProduct.stock}
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
                value={editProduct.description}
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
