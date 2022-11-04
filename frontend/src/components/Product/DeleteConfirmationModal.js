import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DeleteConfirmationModal.css';

import ProductService from "../../services/product.service";

export const DeleteConfirmationModal = ({show, handleClose, productData, closeDeleteModal, changeDataDeleteOrEdit}) => {

  const productDeleteHandler = (productId) => {
     ProductService.deleteProduct(productId).then((response) => {
      closeDeleteModal();
      changeDataDeleteOrEdit();
     })
  }
    return (
        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="secondary" onClick={()=> productDeleteHandler(productData.productId)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>

    );
}


