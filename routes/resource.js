 
var express = require('express'); 
var router = express.Router(); 
 
// Require controller modules. 
var api_controller = require('../controllers/api'); 
var tool_controller = require('../controllers/tool'); 

/// API ROUTE /// 
 
// GET resources base. 
router.get('/resource', api_controller.api); 
 
/// COSTUME ROUTES /// 
 
// POST request for creating a Costume.  
router.post('/resource/tool', tool_controller.tool_create_post); 
 
// DELETE request to delete Costume. 
router.delete('/resource/tool/:id', tool_controller.tool_delete); 
 
// PUT request to update Costume. 
router.put('/resource/tool/:id', tool_controller.tool_update_put); 
 
// GET request for one Costume. 
router.get('/resource/tool/:id', tool_controller.tool_detail); 
 
// GET request for list of all Costume items. 
router.get('/resource/tool', tool_controller.tool_list); 
 
module.exports = router; 