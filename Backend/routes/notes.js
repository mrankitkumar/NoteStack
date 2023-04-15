const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//fetch all notes of user those user thar are login

//routes 1:- Get all the notes using GET:request
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try{
        const note= await Notes.find({ user: req.user.id });
        res.json(note);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({ error:"internal server  occur"});
    }
});

//routes 2:- Add all the notes using Post:request
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Descriptions must be atleast 5 characters').isLength({ min: 5 }),
    body('tag', 'Enter a valid tag').isLength({ min: 3 }),
], async (req, res) => {
    try{
        const {title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const saveNote=await note.save();
    
        res.json(saveNote);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({ error:  " internal server  occur" });
    }
   


});

//routes 3:- update all the notes using Post:request
router.put('/updatenote/:id', fetchuser,async (req, res) => {
    try{
        const {title,description,tag}=req.body;
        const newnote={};
            if(title)
            {
                newnote.title=title;
            }
            if(description)
            {
                newnote.description=description;
            }
            if(tag)
            {
                newnote.tag=tag;
            }

            //find the note to update
            let note=await Notes.findById(req.params.id);
            if(!note)
            {
                res.status(404).send("Not Found");
            }
            //notes user id not equal ro request notes id
            if(note.user.toString()!==req.user.id)
            {
                   return res.status(401).send("Not Allowed");
            }
            note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
            res.json({note});
        // const saveNote=await note.save();
    
        // res.json(saveNote);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({ error:  " internal server  occur" });
    }
   


});
//Route 4: Delete notes using:Delete request

router.delete('/deletenote/:id', fetchuser,async (req, res) => {
    try{
        const {title,description,tag}=req.body;
        
        
          //find the note to deleted 
            let note=await Notes.findById(req.params.id);
            if(!note)
            {
                res.status(404).send("Not Found");
            }
            //notes user id not equal ro request notes id
            //allow deletion 
            if(note.user.toString()!==req.user.id)
            {
                   return res.status(401).send("Not Allowed");
            }
            note=await Notes.findByIdAndDelete(req.params.id)
            res.json({"Success":"Notes has been deleted",note:note});
        // const saveNote=await note.save();
    
        // res.json(saveNote);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({ error:  " internal server  occur" });
    }
   
});

module.exports = router;

