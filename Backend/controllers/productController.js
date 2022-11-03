import Product from "../models/product.js"

const createProduct = async (req, res) => {
 
    try{
      const { productname, price, stock, description } = req.body;

        const newProduct = await Product.create({
        productname,
        price,
        stock,
        description
        });
        if(newProduct) {
          return res.status(200).send({ message: 'Product Created Successfully', newProduct });
        }

      } catch (error) {
        return res.status(500).send({error : `Error occured while creating product due to : ${error.message}`});
      }
}

 const getAllProducts= (req, res) => {

  Product.find((err, products) => {
      if (!err) {
          res.status(200).json(products);
      }
      else {
          res.status(500).send({ message: "Some error occurred while retrieving products" });
      }
  })
}
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    Product.findByIdAndDelete(productId, (err, doc) => {
      if (!err) {
          res.send({
              message: "Product deleted successfully!"
          })
      }
      else {
          res.status(500).send({ message: "Could not delete Product" });
      }
  })
}
const editProductData = async (req, res) => {
  const productId = req.params.id;

  Product.findById(productId, (err, doc) => {
      if (!err) {
          res.status(200).json(doc);
      }
      else {
          res.status(500).send({ message: "Some error occurred while retrieving product id" });
      }
  })
}

export {createProduct,getAllProducts, deleteProduct, editProductData};