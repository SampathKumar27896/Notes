const yargs = require("yargs");
const notes = require('./notes');
add_command_object = {
    'command' : 'add',
    'description' : 'Command to add a note',
     handler(argv){
        notes.addNotes(argv.title,argv.body);
     },
     builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        },
        body :{
            describe : "Body of the note",
            demandOption : true,
            type : 'string'
        }
     }
}

read_command_object = {
    'command' : 'read',
    'description' : 'Command to read a note',
     handler(argv){
        notes.readNote(argv.title);
     },
     builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        }
     }
}


remove_command_object = {
    'command' : 'remove',
    'description' : 'Command to remove a note',
     handler(argv){
        notes.removeNote(argv.title);
     },
     builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        }
     }
}

list_command_object = {
    'command' : 'list',
    'description' : 'Command to list notes',
     handler(){
        notes.getNotes();
     }
}

yargs.command(add_command_object);
yargs.command(read_command_object);
yargs.command(remove_command_object);
yargs.command(list_command_object);
yargs.parse();
