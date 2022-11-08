import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ProductService from "../../services/product.service";


export const AddToCart = ({show, handleCartClose, productDetails}) => {
//Current User
var authenticatedUser = localStorage.getItem("user");
var currentUser = JSON.parse(authenticatedUser);


  const addToCartHandler = () => {
    ProductService.productAddToCart({productId : productDetails.productId,currentUser : currentUser}).then((response) => {
      handleCartClose();
  });
  }

    return (
        <>
        <Modal show={show} onHide={handleCartClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
