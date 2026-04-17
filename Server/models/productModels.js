import mongoose from 'mongoose'

const productschema = new mongoose.Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    description:{type:String, required:true},
    image:{type:Array, required:true},
    category:{type:String, required:true},
    bestProduct:{type:Boolean},
    date:{type:Date, required:true},
})

const productModel = mongoose.models.product || mongoose.model('product',productschema)
export default productModel