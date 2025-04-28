// Eftersom vi använder NeDB behöver vi inte definiera något schema.
const NeDB = require("nedb");

// Skapa en instans av NeDB för anteckningsdatabasen
const db = new NeDB({
  filename: "./db/notes.db",
  autoload: true,
});

// Funktion för att skapa en anteckning
const createNote = (noteData, callback) => {
  const note = {
    title: noteData.title,
    text: noteData.text,
    createdAt: new Date(),
    modifiedAt: new Date(),
    userId: noteData.userId, // Användar-ID för att koppla anteckning till användare
  };

  db.insert(note, callback);
};

const getNotes = (userId, callback) => {
  db.find({ userId }, callback);
};

const updateNote = (noteId, updateData, callback) => {
  updateData.modifiedAt = new Date(); // Uppdatera `modifiedAt` när en anteckning ändras
  db.update({ _id: noteId }, { $set: updateData }, {}, callback);
};

const deleteNote = (noteId, callback) => {
  db.remove({ _id: noteId }, {}, callback);
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
