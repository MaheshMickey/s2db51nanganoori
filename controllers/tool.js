var Tool = require('../models/tool'); 
 
// List of all tools
exports.tool_list = function(req, res) { 
    res.send('NOT IMPLEMENTED: tool list'); 
}; 
 
// for a specific tool 
exports.tool_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: tool detail: ' + req.params.id); 
}; 
 
// Handle tool create on POST. 
exports.tool_create_post  = function(req,res){
    res.send('NOT IMPLEMENTED: tool create post: '+req.params.id);
}
// Handle tool delete form on DELETE. 
exports.tool_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: tool delete DELETE ' + req.params.id); 
}; 
 
// Handle tool update form on PUT. 
exports.tool_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: tool update PUT' + req.params.id); 
}; 

exports.tool_list = async function(req, res) {
    try{
    theTool = await Tool.find();
    res.send(theTool);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

exports.tool_view_all_Page = async function(req, res) { 
    try{ 
        theTool = await Tool.find(); 
        res.render('tools', { title: 'Tool Search Results', results: theTool }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

exports.tool_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new Tool(); 
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
        result = await Tool.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
};

exports.tool_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await Tool.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.name)  
               toUpdate.name= req.body.name; 
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
 