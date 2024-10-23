import { loginUserValidator, registerUserValidator, updateProfileValidator } from "../validators/user-validators.js";
import { UserModel } from "../models/user-models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";

// Register, Login, Logout
export const registerUser = async(req,res,next)=>{
    try {
        // Validate user input
        const {error, value} = registerUserValidator.validate(req.body);
        if (error){
            return res.status(422).json(error);
        }
        // Check if user does not exist
        const user = await UserModel.findOne({email: value.email});
        if (user){
            return res.status(409).json('User already exist!');
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        //Save the user into database
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'User Registration',
            text: 'Account Registered Successfully'
        });

        await UserModel.create({
            ...value,
            password: hashedPassword
        });
res.json({
    message:'User registered!'
});
        
    } catch (error) {
       next(error);
    }
}

export const loginUser = async(req,res,next) => {
    try {
       const {error, value} = loginUserValidator.validate(req.body);
       if(error){
        return res.status(422).json(error);
       }
    //Find one user with identifier
    const user = await UserModel.findOne({email:value.email});
    if(!user){
        return res.status(404).json
        ('User does not exist');
    }
    //Compare their passwords
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword){
        return res.status(401).json('Invalid Crendentials!');
    }
    // Sign a token for  user
    const token = jwt.sign(
        {id:user.id}, 
        process.env.JWT_PRIVATE_KEY,
        {expiresIn:'24h' /* it can be 1d or 1m*/ }
    );

    // Respond to request
    res.json({
        message: 'User Logged In',
        accessToken: token
    });
    } catch (error) {
     next(error)   
    }
}

export const getProfile = async (req,res,next)=>{
    try {
        // Find authentication user from database
        const user = await UserModel.findById(req.auth.id)
        .select({password: false});
         // Respond to request
         res.json(user);
    } catch (error) {
       next(error) ;
    }
}

export const logoutUser = (req,res,next)=>{
    res.json({
       message: 'User Logged Out!'
    });
}

export const updateProfile = async(req,res,next)=>{
try {
    // validate user input
    const {error,value} = updateProfileValidator.validate(req.body);
    if (error){
        return res.status(422).json(error);
    }
    await UserModel.findByIdAndUpdate(value);
    res.json('User Profile Updated!')
} catch (error) {
   next(error) 
}
}
