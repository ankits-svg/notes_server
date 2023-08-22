const express=require('express')
const { NoteModel } = require('../models/notes.models')
const noteRoute=express.Router()
const jwt=require('jsonwebtoken')

noteRoute.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,'pract')
    console.log("decoded:",decoded)
    try {
        if(decoded){
            const note=await NoteModel.find({'userID':decoded.userID})
            res.status(200).send({'msg':note})
        }
        
    } catch (error) {
        res.status(400).send({'msg':error.message})
    }
})

noteRoute.post("/add",async(req,res)=>{
    try {
        const note=new NoteModel(req.body)
        await note.save()
        console.log("note:",note)
        res.status(400).send({'msg':'Notes updated'})
    } catch (error) {
        res.status(400).send({'msg':error.message})
    }
})

noteRoute.patch("/update/:noteID",async(req,res)=>{
    try {
        const {noteID}=req.params;
        console.log("noteId:",noteID)
        const update=await NoteModel.findByIdAndUpdate(noteID,req.body)
        res.status(200).send({"msg":"Notes updated succesfully"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

noteRoute.delete("/delete/:noteID",async(req,res)=>{
    try {
        const {noteID}=req.params;
      await NoteModel.findByIdAndDelete(noteID)
      res.status(200).send({'msg':"Data deleted succefullly"})  
    } catch (error) {
        res.status(400).send({"msg":"Error occured in deleting"})
    }
})

module.exports={
    noteRoute
}