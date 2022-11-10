import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ProductService from "../../services/product.service";


export const AddToCart = ({show, handleCartClose, productDetails}) => {
//Current User
var authenticatedUser = localStorage.getItem("user");
var userId = JSON.parse(authenticatedUser).id;

const [productQuantity, setProductQuantity] = useState(0);
const [message, setMessage] = useState("");
const [successful, setSuccessful] = useState(false);

  const validationHandler = () => {
  if(productQuantity < 1) {
    setMessage('Please enter product quantity!');
    setSuccessful(false);
    return false;
   }
   return true;
  }

  const addToCartHandler = () => {
    var isQuantity = validationHandler();
    if(isQuantity){
      ProductService.productAddToCart({productId : productDetails.productId,userId : userId, quantity : productQuantity}).then((response) => {
        setSuccessful(true);
        handleCartClose();
    });
    }
  }
  const productQuantityHandler = (e) => {
    setProductQuantity(e.target.value);
  }

    return (
        <>
        <Modal show={show} onHide={handleCartClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          <table className="table">
            <tbody>
              <tr>
                <th>Product Name</th>
                <td>{productDetails.productname}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>{productDetails.price}</td>
              </tr>
              <tr>
                <th>Available Stock</th>
                <td>{productDetails.stock}</td>
              </tr>
              <tr>
                <th>Product Image</th>
                <td>
                <figure className="image is-64x64">
                    <img src={productDetails.productfile} />
                 </figure>
                </td>
              </tr>
              <tr>
                <th>Product Quantity</th>
                <td>
                <input
                className="input"
                type="number"
                name="quantity"
                value={productQuantity}
                onChange={productQuantityHandler}
              />
                </td>
              </tr>
            </tbody>
</table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCartClose}>Close</Button>
            <Button variant="secondary" onClick={addToCartHandler}>Add to Cart</Button>
          </Modal.Footer>
        </Modal>
      </>
      );
}
