export const getNotes = (db) => (req, res) => {
  db.notes.find({}, (err, notes) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    res.json(notes);
  });
};

export const createNote = (db) => (req, res) => {
  const { title, text } = req.body;
  if (title.length > 50) {
    return res.status(400).json({ message: "Titeln får max vara 50 tecken" });
  }
  if (text.length > 300) {
    return res.status(400).json({ message: "Texten får max vara 300 tecken" });
  }
  const newNote = {
    title,
    text,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  db.notes.insert(newNote, (err, note) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    res.status(201).json(note);
  });
};

export const updateNote = (db) => (req, res) => {
  const { id, title, text } = req.body;

  if (!id || !title || !text) {
    return res
      .status(400)
      .json({ message: "ID, title, and text are required" });
  }

  db.notes.update(
    { _id: id },
    { $set: { title, text, modifiedAt: new Date() } },
    {},
    (err, numUpdated) => {
      if (err)
        return res.status(500).json({ message: "Server error", error: err });
      if (numUpdated === 0)
        return res.status(404).json({ message: "Note not found" });
      res.json({ message: "Note updated" });
    }
  );
};

export const deleteNote = (db) => (req, res) => {
  const { id } = req.body;

  db.notes.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (numRemoved === 0)
      return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  });
};

export const searchNotes = (db) => (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Title is required for search" });
  }

  db.notes.find({ title: new RegExp(title, "i") }, (err, notes) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    res.json(notes);
  });
};
