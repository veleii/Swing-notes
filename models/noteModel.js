const NeDB = require("nedb");

const db = new NeDB({
  filename: "./db/notes.db",
  autoload: true,
});

const createNote = (noteData, callback) => {
  const note = {
    title: noteData.title,
    text: noteData.text,
    createdAt: new Date(),
    modifiedAt: new Date(),
    userId: noteData.userId,
  };

  db.insert(note, callback);
};

const getNotes = (userId, callback) => {
  db.find({ userId }, callback);
};

const updateNote = (noteId, updateData, callback) => {
  updateData.modifiedAt = new Date();
  db.update({ _id: noteId }, { $set: updateData }, {}, callback);
};

const deleteNote = (noteId, callback) => {
  db.remove({ _id: noteId }, {}, callback);
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
