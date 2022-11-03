// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {EditForm} from "./EditForm";

export const EditModal = ({show, productDetails}) => {
    return (
        <>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm productDetails={productDetails}/>
          </Modal.Body>
        </Modal>
      </>
    );
}
