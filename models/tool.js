const mongoose = require("mongoose") 
const toolSchema = mongoose.Schema({ 
 name:{
     type:String,
     minLength:4,
     maxLength:30
 },
 version: String, 
 cost:{
     type:Number,
     min:10,
     max:400
 }
})
 
module.exports = mongoose.model("Tool",toolSchema) 
const valid = mongoose.validate(this.schema);