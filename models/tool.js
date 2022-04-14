const mongoose = require("mongoose") 
const toolSchema = mongoose.Schema({ 
 name: String, 
 version: String, 
 cost: Number 
});
 
module.exports = mongoose.model("Tool", 
toolSchema) 