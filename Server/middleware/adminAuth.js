import jwt from 'jsonwebtoken';

export const adminAuth = (req,res,next)=>{ 
 try{
    const token = req.headers
    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized user"})
    }
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.status(401).json({success:false,message:"Unauthorized user"})
    }
    next();
}catch(error){
    console.log(error)
    res.status(401).json({success:false,message:"Unauthorized user"})   
}
}