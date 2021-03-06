var tool = require('../models/tool'); 
 
exports.tool_list = async function(req, res) {
    try{
    theTool = await tool.find();
    res.send(theTool);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

exports.tool_view_all_Page = async function(req, res) { 
    try{ 
        theTool = await tool.find(); 
        res.render('tool', { title: 'Tool Search Results', results: theTool }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

exports.tool_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new tool(); 
    document.name = req.body.name;
    document.version = req.body.version;
    document.cost = req.body.cost;
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
};

exports.tool_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await tool.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
};

exports.tool_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await tool.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.name) toUpdate.name= req.body.name; 
        if(req.body.version) toUpdate.version = req.body.version; 
        if(req.body.cost) toUpdate.cost = req.body.cost; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 

exports.tool_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await tool.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 
 
exports.tool_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await tool.findById( req.query.id) 
        res.render('tooldetail',  
{ title: 'Tool Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

 
// Handle building the view for creating a costume. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.tool_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('toolcreate', { title: 'Tool Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 


// Handle building the view for updating a costume. 
// query provides the id 
exports.tool_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await tool.findById(req.query.id) 
        res.render('toolupdate', { title: 'Tool Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
    
}; 

// Handle a delete one view with id from query 
exports.tool_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await tool.findById(req.query.id) 
        res.render('tooldelete', { title: 'Tool Delete', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 