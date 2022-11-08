import mongoose from "mongoose";
const Schema = mongoose.Schema;

var CartSchema = new mongoose.Schema({
            product_id : {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            user_id :  {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
    }, {
        timestamps: true,
        versionKey: false,
    });

var cartModel = mongoose.model("Cart", CartSchema);
export default cartModel;
