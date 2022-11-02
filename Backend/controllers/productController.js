import Product from "../models/product.js"

const createProduct = async (req, res) => {
 
    try{
      const { productname, price, stock, description } = req.body;
      console.log(productname);
      console.log(price);
      console.log(stock);
      console.log(description);

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

export {createProduct,getAllProducts};