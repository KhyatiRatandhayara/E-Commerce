import mongoose from "mongoose";

var ProductSchema = new mongoose.Schema({
            productname: { type: String, required: true },
            price: {type: Number, required: true},
            stock: { type: Number, required: true },
            description: { type: String },
    }, {
        timestamps: true,
        versionKey: false,
    });

var productModel = mongoose.model("Product", ProductSchema);
export default productModel;
