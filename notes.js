//Importing File system module 
const fs = require("fs");
const colorPrint = require("chalk");
const getNotes  = () =>{
    const notes = readNotes();
    if(notes.length > 0){
         //console.log(notes);
         console.log(colorPrint.blue.italic("The notes are :"));
         notes.forEach((note) => {
             console.log(colorPrint.green.dim(note.title));
         });
    }else
        console.log(colorPrint.red.inverse("No notes exists..!"));

}


//Function : Function to add a note
//Input    : title,body
//Output   : status message
const addNotes = (title,body) => {
    //First try to read and load the contents of the file.

    debugger;
    const notes = readNotes();
    const duplicate = notes.find( (note) => note.title === title )
   
    if(!duplicate){
        notes.push({
            title : title,
            body : body
        });
        saveNote(notes);
        console.log(colorPrint.green.inverse("Note added..!"));
    }
    else
        console.log(colorPrint.red.inverse("Note title already exists..!"));
    
   
    
}


//Function : Read all the notes 
//Input    : -
//Output   : returns all the notes in the file notes.js 
const readNotes = function(){
    try{
        const buffer = fs.readFileSync('notes.json');
        const JSONstring = buffer.toString();
        const JSONobject = JSON.parse(JSONstring);
        return JSONobject;
    }catch(e){
        return [];
    }
    
}


//Function : To remove a note
//Input    : note's title 
//Output   : status message
const removeNote = (title) => {
    const notes = readNotes();
    const notesToKeep = notes.filter( (note) => note.title !== title );
    if(notes.length > notesToKeep.length){
        console.log(colorPrint.green.inverse("Note with title "+ title +" is removed"));
        saveNote(notesToKeep);
    }else
        console.log(colorPrint.red.inverse("Note with title "+ title +" is not found"));
    
    
}

//Function : To save a note
//Input    : notes object 
//Output   : status message
const saveNote = (notes) => {
    const JSONString = JSON.stringify(notes);
    fs.writeFileSync('notes.json',JSONString);
}

//Function : To read a note
//Input    : note's title 
//Output   : print note 
const readNote = (title) => {
    const notes = readNotes();
    const noteToRead = notes.find((note) =>{
        return note.title === title;
    });
    if(noteToRead){
        console.log("Title :"+colorPrint.green.inverse(noteToRead.title));
        console.log("Body  :"+ noteToRead.body);
    }
    else    
        console.log(colorPrint.red.inverse("Note with title "+title+" not found !"));
}


//Exporting more than one function or variable 
module.exports = {
    getNotes : getNotes,
    addNotes : addNotes,
    removeNote : removeNote,
    readNote : readNote,

} 