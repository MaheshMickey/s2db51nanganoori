var express = require('express'); 
var router = express.Router(); 
 
// Require controller modules. 
var api_controller = require('../controllers/api'); 
var tool_controller = require('../controllers/tool'); 

/// API ROUTE /// 
 
// GET resources base. 
router.get('/', api_controller.api); 
 
router.get('/detail',tool_controller.tool_view_one_Page);

router.get('/create', tool_controller.tool_create_Page); 

router.get('/update', tool_controller.tool_update_Page); 

router.get('/delete', tool_controller.tool_delete_Page); 
/// COSTUME ROUTES /// 
 
// POST request for creating a Costume.  
router.post('/tool', tool_controller.tool_create_post); 
 
// DELETE request to delete Costume. 
router.delete('/tool/:id', tool_controller.tool_delete); 
 
// PUT request to update Costume. 
router.put('/tool/:id', tool_controller.tool_update_put); 
 
// GET request for one Costume. 
router.get('/tool/:id', tool_controller.tool_detail); 
 
// GET request for list of all Costume items. 
router.get('/tool', tool_controller.tool_list); 
 
module.exports = router; 