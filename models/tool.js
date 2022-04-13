const mongoose = require("mongoose") 
const toolSchema = mongoose.Schema({ 
 name: String, 
 verison: String, 
 cost: Number 
});
 
module.exports = mongoose.model("Tool", 
toolSchema) 