import User from "../models/user.js"

const checkUsernameOrEmailExist = async (req, res, next) => {
    try{

        // check if user already exist
        // Validate if user exist in our database
        // const isUsernameExist = await User.findOne({
        //         username :req.body.username
        // });

        // if(isUsernameExist != null){
        //    return  res.status(400).send({message : 'Username Already Exist!.'});
        // }
        const isEmailExist = await User.findOne({
                email :req.body.email
        });
        if(isEmailExist != null){
            return  res.status(500).send({message : 'Email Already Exist!.'});
        }
        next();
    } catch(error) {
        next(error);
    }
       
}

export default checkUsernameOrEmailExist;