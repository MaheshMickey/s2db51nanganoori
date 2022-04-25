var express = require('express');
const tool_controller = require('../controllers/tool');
var router = express.Router();
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 

 
  router.get('/',tool_controller.tool_view_all_Page); 
 
  router.get('/detail',tool_controller.tool_view_one_Page);
  
  router.get('/create',secured, tool_controller.tool_create_Page); 
  
  router.get('/update', secured, tool_controller.tool_update_Page); 
   
  
  router.get('/delete', secured, tool_controller.tool_delete_Page); 

module.exports = router;
