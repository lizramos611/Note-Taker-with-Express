const { json } = require("body-parser");

let noteTitle;
let noteInput;
let saveNote;
let newNote;
let noteList;


if (window.location.pathname === '/notes'){
    noteTitle = document.querySelector('.note-title');
    noteInput = document.querySelector('.note-input');
    saveNote = document.querySelector('.save-note');
    newNote = document.querySelector('.new-note');
    noteList = document.querySelectorAll('.list-group .list-container');

}



const hide = (element) => {
    element.style.display = 'none';
};


const show = (element) => {
    element.style.display = 'inline'
};


let activeNote = {};

const getNotes = () =>
fetch('/api/notes', {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json'
    }
});

const deleteNotes = (id) =>
fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type' : 'application/json'

    }
});

const saveNotes = (notes) =>
fetch('/api/notes', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'

    },
    body: JSON.stringify(notes)
}
);


const renderActiveNote = () => {
    hide(saveNote);

    if (activeNote.id) {
        noteTitle.setAttribute('readonly', true);
        noteInput.setAttribute('readonly', true);
        noteTitle.value = activeNote.title;
        noteInput.vaue = activeNote.text;

    }

    else {
        noteTitle.removeAttribute('readonly');
        noteInput.removeAttribute('readonly');
        noteInput.value = '';
        noteTitle.value = '';

    }
}


const noteSaving = () => {
    const newNote = {
       text: noteInput.value,
       title: noteTitle.value,

    };
    saveNote(newNote).then(() =>{
        getNewNotes();
        renderActiveNote();
    });
};
const noteDeleted = (e) => {
    e.stopPropogation();
    const note = e.target;
    const noteID = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if(activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNotes(noteId.then(() => {
        getNewNotes();
        renderActiveNote();
    }))
}

const noteView =  (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
  };


const newNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
};


const saveButton = () => {
    if(!noteTitle.value.trim() || !noteInput.value.trim()) {
        hide(saveNote);

    }
    else {
        show(saveNote);
    }
}


const newNoteList = async (notes) => {
    let jsonNotes = await notes.json();
if (window.location.pathname === '/notes') {
    noteList.forEarch((element) => (element.innerHTML = ''))
}}

let noteItems = [];


const createList = (text, deletebutton = true) => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-group-item');

    const spanElement = document.createElement('span');
    spanElement.classList.add('list-item-title');
    spanElement.innerText = text;
    spanElement.addEventListener('click', noteView);
    listElement.append(spanElement);




    if (deletebutton) {
        const deletebuttonElement = document.createElement('i');
        deletebuttonElement.addEventListener('click', noteDeleted);

        listElement.append(deletebuttonElement);

    }
    return listElement;
} ;

if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No Notes have been saved', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  };

const getAndRenderNotes = () => getNotes().then(newNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', noteSaving);
  newNoteBtn.addEventListener('click', newNoteView);
  noteTitle.addEventListener('keyup', saveButton);
  noteText.addEventListener('keyup', saveButton);
}

getAndRenderNotes();