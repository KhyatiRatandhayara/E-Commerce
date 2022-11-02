import User from "../models/user.js"
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    try{
      const { username, email, password } = req.body;
  
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await User.create({
          username,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
        if(newUser) {
          return res.status(200).send({ message: 'User Created Successfully', newUser });
        }
    
      } catch (error) {
        return res.status(500).send({error : `Error occured while creating user due to : ${error.message}`});
      }
}

//login
const signInUser = async (req, res) => {

  console.log(req.body);
  const { email, password } = req.body;

    let isUserSignUp = await User.findOne({
        $and :[{
            email : email,
         }] 
    });
    if(!isUserSignUp){
        return res.status(400).send({message : "User Not found.Please Sign Up in the System!."});
    }

    if(!await bcrypt.compare(password, isUserSignUp.password)){
      return res.status(400).send({message : "Authentication failed.Please enter valid password."});
    }

    const sessUser = { id: isUserSignUp._id }
    req.session.user = sessUser;

    if(req.session.user){
      return res.status(200).send({message : "User login Successfully.", sessUser});
    }
    // let token = jwt.sign({id : isUserSignUp.id},config.secret,{
    //  expiresIn : 60 //24 hours
    // });
    // console.log(token);
    // return res.status(200).send({
    //     id : isUserSignUp.id,
    //     username : isUserSignUp.username,
    //     email : isUserSignUp.email,
    //     accessToken : token
    // });
    
}
const logoutUser = async (req, res) => {

  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session-id"); // clears cookie containing expired sessionID

   return res.status(200).send({ message: "Logged out successfully." });
  });

}

const authChecker = (req, res) => {
    const sessUser = req.session.user;
    if (sessUser) {
      return res.json({ message: " Authenticated Successfully", sessUser });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
}

export {registerUser,signInUser,logoutUser,authChecker};