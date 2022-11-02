import "./ProductItems.css"
export const ProductItems = () => {
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
            <th scope="col">S.No</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Available Stock</th>
            <th scope="col">Product Image</th>
            <th scope="col">Action</th>
 
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
        </tr>
        </tbody>
        </table>
      </div>
    );
}
