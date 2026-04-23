import validator from "validator"
import userModel from "../models/userModels.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}


export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"Invalid user "})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token= createToken(user._id);
            res.json({success:true, message: "Login successful", token})
        }else{
            res.json({success:false,message:"Incorrect password"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const registerUser = async(req,res)=>{
    try {
        const{name,email,password}=req.body
        const exist =  await userModel.findOne({email});
        if(exist){
            return res.status(400).json({success:false,message:"User already exist"})
        }
        if (!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Invalid email address"})
        }
        if(password.length< 8){
            return res.status(400).json({success:false,message:"Please enter strong password"})
        }
       // hash password
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)
       
       // create new user
        const newUser = new userModel({
            name,email,password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, message: "User registered successfully", token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const adminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false,message:"Invalid admin credentials"})
        }
    } catch (error) {
        
    }
}

