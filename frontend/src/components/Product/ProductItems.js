import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';

import "./ProductItems.css"

import ProductService from "../../services/product.service";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { EditModal } from "./EditModal";
import {AddToCart} from '../Cart/AddToCart.js';

export const ProductItems = () => {


    //Current User
    var authenticatedUser = localStorage.getItem("user");
    var currentUser = JSON.parse(authenticatedUser);


    const [data, getData] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState([]);

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [productData, getProductData] = useState({
        productId : null
    })
    const [productDetails, setProductDetails] = useState({
        productId : null,
        productname: "",
        price: "",
        stock: "",
        productfile: "",
      });
      const [filteredProduct, setFilteredProduct] = useState({
        productname : '',
        price: "",
      });
      const [searchData, setSearchData] = useState("");
      // const [cartProduct, setCartProduct] = useState({
      //      productId : null
      // });

    useEffect(() => {
        ProductService.getAllProducts().then((response) => {
            getData(response.data);
        });
      }, [isDataUpdated]);

      
      const filterProducts = data.filter((product) => {
        return product.productname.toLowerCase().indexOf(filteredProduct.productname.toLowerCase()) > -1; // true
      });

      const filterHandler = (e) => {
        setFilteredProduct({
          productname : e.target.value
        });
        setSearchData(e.target.value);
      }

       const handleClose = () => setShowDelete(false);
       const handleCartClose = () => setShowCartModal(false);

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
            const {productname, price, stock, description,productfile } = response.data;
            setProductDetails({productId,productname, price, stock, description,productfile});
            setShowEdit(true);
        });
      }

      const changeDataDeleteOrEdit = () => {
        setIsDataUpdated(data);
      }
      const onSearchClear = () => {
        setSearchData('');
        setFilteredProduct({
          productname : ''
        });
      }
      const addToCartHandler = (productId) => {
        ProductService.getEditProductDetail(productId).then((response) => {
          const {productname, price, stock, description,productfile } = response.data;
          setProductDetails({productId,productname, price, stock, description,productfile});
          setShowCartModal(true);
      });
      }

      const columns = [
        //    { name: 'Sr.No', selector: row => row.row._id ,omit : true},
          { name: 'Product Name', selector: row => row.productname,sortable: true},
          { name: 'Product Price', selector: row => row.price,sortable: true, },
          { name: 'Available Stock', selector: row => row.stock,sortable: true,},
          { cell: (row) => 
            <figure className="image is-128x128">
            <img src={row.productfile} alt="productimage"/>
            </figure>,
           name : 'Product Image',
        },
          { cell: (row) => 
            <>
                {currentUser.isAdmin ? 
                   <>
                    <button className="btn btn-success editproductbtn" onClick={() => editHandler(row._id)}> Edit </button>
                    <Button variant="secondary" onClick={() => deleteHandler(row._id)}>Delete</Button></>
                     :   
                    <Button variant="secondary" onClick={() => addToCartHandler(row._id)}>Add to Cart</Button>
                    
                    }
            </>,
           name : 'Action',
           ignoreRowClick: true,
            allowOverflow: true, 
            button: true
        },
    ];

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
            <label className="label label_search">Product Search: </label>
            <div className="float-end mb-2">
            <button onClick={onSearchClear}  className="btn btn-secondary">X</button>
            </div>
            <div className="float-end mb-2">
            <input
                className="input"
                type="text"
                name="productFilter"
                onChange={filterHandler}
                value={searchData}
              />
            </div>
          
        </div>
    </div>
    <DataTable columns={columns} data={filterProducts} pagination={true} />
      {/* <table className="table table-bordered product_table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
          {filterProducts.length ? filterProducts.map((productItem, i) => (
                  <tr key={productItem._id}>
                    <td>{i+1}</td>
                    <td>{productItem.productname}</td>
                    <td>{productItem.price}</td>
                    <td>{productItem.stock}</td>
                    <td>
                    <figure className="image is-128x128">
                    <img src={productItem.productfile}  alt="productimage"/>
                    </figure>
                     </td>
                  {currentUser.isAdmin ? 
                    <td>
                    <button className="btn btn-success editproductbtn" onClick={() => editHandler(productItem._id)}> Edit </button>
                    <Button variant="secondary" onClick={() => deleteHandler(productItem._id)}>Delete</Button>
                    </td> :   <td>
                    <Button variant="secondary" onClick={() => addToCartHandler(productItem._id)}>Add to Cart</Button>
                    </td>
                    }
                    </tr>
            )) : <tr><td>No Results.</td></tr>}
        </tbody>
        </table> */}
        {showDelete && <DeleteConfirmationModal show = {showDelete} handleClose = {handleClose} productData={productData} closeDeleteModal={closeDeleteModal} changeDataDeleteOrEdit={changeDataDeleteOrEdit}/>}
        {showEdit && <EditModal show = {showEdit} productDetails={productDetails} changeDataDeleteOrEdit={changeDataDeleteOrEdit} closeEditModal={closeEditModal}/>}
        {showCartModal && <AddToCart show = {showCartModal} handleCartClose={handleCartClose} productDetails={productDetails}/>}
      </div>
     
    );
}
