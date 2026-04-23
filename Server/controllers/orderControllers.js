


export const allOrder= async(req,res)=>{
    try {
        const orders = await orderModel.find({})

        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const userOrder= async(req,res)=>{
    try {
        const {userId} = req.body;
        
        const orders = await orderModel.find({userId})

        res.json({success:true,orders})
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const placeOrder= async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:[]})
        res.json({success:true, message:"Order Placed"})
    } catch (error) {
      console.log(error)
        res.json({success:false,message:error.message})   
    }
}
export const placeOrderStripe= async(req,res)=>{
    try {
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const placeOrderRazorpay= async(req,res)=>{
    try {
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const updateStatus= async(req,res)=>{
    try {
        const {orderId, status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({Success: true, message:"Status Updated"})       
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}