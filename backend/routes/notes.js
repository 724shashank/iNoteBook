const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//Route1:  Get All the Notes using : GET "/api/notes/fetchallnotes".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Inernal Server Error');
    }


})

//Route2: Adding Notes using : POST "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({ title, description, tag, user: req.user})
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Inernal Server Error');
    }

})

//Route2: Adding Notes using : PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
const {title,description,tag}=req.body;
//Create a newNote Object
const newNote = {};
if (title){newNote.title = title};
if (description){newNote.description = description};
if (tag){newNote.tag = tag};

//Find the Note to be updated
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")}
if(note.user.toString() !==req.user){
    return res.status(401).send("NOT ALLOWED");
}
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
})
//Route3: Deleting Notes using : PUT "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
//Find the Note to be updated
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")}
if(note.user.toString() !==req.user){
    return res.status(401).send("NOT ALLOWED");
}
    note = await Note.findByIdAndDelete(req.params.id, {new:true})
    res.json({ message: "Note Deleted" });
})
module.exports = router;