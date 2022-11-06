// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import { EditForm } from "./EditForm";

export const EditModal = ({
  show,
  productDetails,
  changeDataDeleteOrEdit,
  closeEditModal,
}) => {
  return (
    <>
      <Modal show={show} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm
            productDetails={productDetails}
            changeDataDeleteOrEdit={changeDataDeleteOrEdit}
            closeEditModal={closeEditModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
