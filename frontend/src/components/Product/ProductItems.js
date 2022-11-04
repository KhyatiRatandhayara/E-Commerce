import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import "./ProductItems.css"

import ProductService from "../../services/product.service";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { EditModal } from "./EditModal";

export const ProductItems = () => {

    const [data, getData] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState([]);

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [productData, getProductData] = useState({
        productId : null
    })
    const [productDetails, setProductDetails] = useState({
        productId : null,
        productname: "",
        price: "",
        stock: "",
        description: "",
      });

    const handleClose = () => setShowDelete(false);

    useEffect(() => {
        ProductService.getAllProducts().then((response) => {
            getData(response.data);
        });
      }, [isDataUpdated]);


      const deleteHandler = (productId) => {
        setShowDelete(true);
        getProductData({
            productId
        })
      } 
      const closeDeleteModal = () => {
        setShowDelete(false);
      }
      const closeEditModal = () => {
        setShowEdit(false);
      }
      const editHandler = (productId)=> {
        ProductService.getEditProductDetail(productId).then((response) => {
            const {productname, price, stock, description} = response.data;
            setProductDetails({productId,productname, price, stock, description});
            setShowEdit(true);
        });
      }

      const changeDataDeleteOrEdit = () => {
        setIsDataUpdated(data);
      }

    return (
      <div className="container mt-3">
        <div className="row">
        <div className="col-lg-12 margin-tb">
            <div className="pull-left">
                <h2 className="pageheading">Product Details</h2>
            </div>
            <div className="float-end mb-2">
                <a className="btn btn-success addproductbtn" href="/addproduct">Add Product</a>
            </div>
        </div>
    </div>
      <table className="table table-bordered">
      <thead>
        <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Available Stock</th>
            <th scope="col">Product Image</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((productItem, i) => (
                  <tr key={productItem._id}>
                    <td>{i+1}</td>
                    <td>{productItem.productname}</td>
                    <td>{productItem. price}</td>
                    <td>{productItem.stock}</td>
                    <td>{productItem.description}</td>
                    <td>
                    <button className="btn btn-success addproductbtn" onClick={() => editHandler(productItem._id)}> Edit </button>
                    <Button variant="secondary" onClick={() => deleteHandler(productItem._id)}>Delete</Button>
                    </td>
                    </tr>
            ))}
        </tbody>
        </table>
        {showDelete && <DeleteConfirmationModal show = {showDelete} handleClose = {handleClose} productData={productData} closeDeleteModal={closeDeleteModal} changeDataDeleteOrEdit={changeDataDeleteOrEdit}/>}
        {showEdit && <EditModal show = {showEdit} productDetails={productDetails} changeDataDeleteOrEdit={changeDataDeleteOrEdit} closeEditModal={closeEditModal}/>}
      </div>
     
    );
}
