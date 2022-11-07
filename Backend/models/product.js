import mongoose from "mongoose";

var ProductSchema = new mongoose.Schema({
            productname: { type: String, required: true },
            price: {type: Number, required: true},
            stock: { type: Number, required: true },
            productfile: {
                type: String,
                required: [true, "Uploaded file must have a name"],
              },
            description: { type: String },
    }, {
        timestamps: true,
        versionKey: false,
    });

var productModel = mongoose.model("Product", ProductSchema);
export default productModel;
