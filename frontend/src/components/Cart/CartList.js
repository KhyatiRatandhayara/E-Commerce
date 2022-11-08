import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './CartList.css';

import ProductService from "../../services/product.service";


export const CartList = () => {
    //Current User
    var authenticatedUser = localStorage.getItem("user");
    var currentUser = JSON.parse(authenticatedUser);

    const[cartData, setCartData] = useState([]);
    useEffect(() => {
        ProductService.getAllCartData({userId : currentUser.id}).then((response) => {
            setCartData(response.data);
        },[cartData]);
    });

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
            <button className="btn btn-secondary">X</button>
            </div>
            <div className="float-end mb-2">
            <input
                className="input"
                type="text"
                name="productFilter"
              />
            </div>
          
        </div>
    </div>
      <table className="table table-bordered product_table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
            {cartData.map((product, i)=> (
                <tr key={product._id}>
                    <td>{i+1}</td>
                    <td>{product.productname}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                    <figure className="image is-128x128">
                    <img src={product.productfile} />
                    </figure>
                     </td>
                    <td>
                    <Button variant="secondary">Delete</Button>
                    </td> 
                    </tr>
            )) || "nxvjv"}
        </tbody>
        </table>
      </div>
        <div className="float-end mb-2">
        <a className="btn btn-success addproductbtn payment">Proceed to Payment</a>
        </div>
      </>
    );
}
