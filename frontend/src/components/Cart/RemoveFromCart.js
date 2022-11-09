import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ProductService from "../../services/product.service";

export const  RemoveFromCart = ({show, handleClose, productData, changeRemoveData}) => {

  const cartRemoveHandler = (productId) => {
     ProductService.deleteCartProduct(productId).then((response) => {
        handleClose();
        changeRemoveData();
     })
  }
    return (
        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this product from cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="secondary" onClick={()=> cartRemoveHandler(productData.productId)}>Remove</Button>
        </Modal.Footer>
      </Modal>
    </>

    );
}


