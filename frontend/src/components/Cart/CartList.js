import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import './CartList.css';

import ProductService from "../../services/product.service";
import { RemoveFromCart } from './RemoveFromCart';


export const CartList = () => {
    //Current User
    var authenticatedUser = localStorage.getItem("user");
    var currentUser = JSON.parse(authenticatedUser);

    const[cartData, setCartData] = useState([]);
    const[isDataUpdated, setIsDataUpdated] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [showRemove, setShowRemove] = useState(false);
    const [productData, setProductData] = useState({
        productId : null
    })

    const[filteredProduct, setFilteredProduct] = useState({
        productname : ''
      });

    useEffect(() => {
        ProductService.getAllCartData({userId : currentUser.id}).then((response) => {
            setCartData(response.data);
        });
    },[isDataUpdated]);
  
 
    const filterProducts = cartData.filter((product) => {
        return product.productname.toLowerCase().indexOf(filteredProduct.productname.toLowerCase()) > -1; // true
      });
  
      const filterHandler = (e) => {
        setFilteredProduct({
          productname : e.target.value
        });
        setSearchData(e.target.value);
      }
      const onSearchClear = () => {
        setSearchData('');
        setFilteredProduct({
          productname : ''
        });
      }

      const removeCartHandler = (productId) => {
        setShowRemove(true);
        setProductData({
            productId : productId
        })
        // setIsDataUpdated(cartData);
     }
     const handleClose = () =>  setShowRemove(false);
     const changeRemoveData= () =>  setIsDataUpdated(cartData);

     const columns = [
        //    { name: 'Sr.No', selector: row => row.row._id ,omit : true},
          { name: 'Product Name', selector: row => row.productname, sortable: true, },
          { name: 'Product Price', selector: row => row.price, sortable: true, },
          { name: 'Quantity', selector: row => row.quantity, sortable: true,},
          { cell: (row) => 
            <figure className="image is-128x128">
            <img src={row.productfile} alt="productimage"/>
            </figure>,
           name : 'Product Image',
        },
          { cell: (row) => 
            <Button variant="secondary" onClick={() => removeCartHandler(row._id)}>Remove</Button>,
           name : 'Action',
           ignoreRowClick: true,
            allowOverflow: true, 
            button: true
        },
        { name: '	Product Image', selector: row => row.productfile ,omit : true},
    ];

    return (
        <>
        <div className="container mt-3">
        <div className="row">
        <div className="col-lg-12 margin-tb">
            <div className="pull-left">
                <h2 className="pageheading">Cart List</h2>
            </div>
            <label className="label search_label">Cart Search: </label>
            <div className="float-end mb-2">
            <button className="btn btn-secondary" onClick={onSearchClear}>X</button>
            </div>
            <div className="float-end mb-2">
            <input
                className="input"
                type="text"
                name="cartFilter"
                value={searchData}
                onChange={filterHandler}
              />
            </div>
          
        </div>
    </div>
    {/* data table example */}
    <DataTable columns={columns} data={filterProducts} pagination={true} />
    {/* simple table example */}
      {/* <table className="table table-bordered product_table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Product Image</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {filterProducts.length ? filterProducts.map((product, i)=> (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{product.productname}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                    <figure className="image is-128x128">
                    <img src={product.productfile} alt="productimage"/>
                    </figure>
                     </td>
                    <td>
                    <Button variant="secondary" onClick={() => removeCartHandler(product._id)}>Remove</Button>
                    </td> 
                    </tr>
            )) : <tr className='is-centered'><td>No Results.</td></tr>}
        </tbody>
        </table> */}
      </div>
        <div className="float-end mb-2">
        <button className="btn btn-success addproductbtn payment">Proceed to Payment</button>
        </div>
        {showRemove && <RemoveFromCart show={showRemove} handleClose={handleClose} productData={productData} changeRemoveData={changeRemoveData}/>}
      </>
    );
}
