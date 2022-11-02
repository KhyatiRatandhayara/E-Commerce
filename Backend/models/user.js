import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
            username: { type: String, required: true },
            email: {type: String, required: true,index: { unique: true }},
            password: { type: String, required: true },
            active: {type: Boolean, default: true},
    }, {
        timestamps: true,
        versionKey: false,
    });

var userModel = mongoose.model("User", UserSchema);
export default userModel;
