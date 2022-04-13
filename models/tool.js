const mongoose = require("mongoose") 
const toolSchema = mongoose.Schema({ 
 costume_type: String, 
 size: String, 
 cost: Number 
}) 
 
module.exports = mongoose.model("Tool", 
toolSchema) 