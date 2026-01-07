const { 
    getAllNotes, 
    getNoteById, 
    createNote, 
    updateNote, 
    deleteNote 
} = require('../services/notesService');

const getAll = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { search } = req.query; 
        const notes = await getAllNotes(userId, search);
        res.status(200).json({ status: 200, data: notes });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const note = await getNoteById(req.params.id, userId);
        if (!note) {
            return res.status(404).json({ status: 404, message: "Qeyd tapılmadı" });
        }
        res.status(200).json({ status: 200, data: note });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

// Yeni qeyd yarat
const create = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.user_id;
        const newNote = await createNote({ user_id: userId, title, description });
        res.status(201).json({ status: 201, data: newNote });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

// Qeydi yenilə
const update = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const updatedNote = await updateNote(req.params.id, userId, req.body);
        if (!updatedNote) {
            return res.status(404).json({ status: 404, message: "Yenilənəcək qeyd tapılmadı" });
        }
        res.status(200).json({ status: 200, data: updatedNote });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

// Qeydi sil
const remove = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const result = await deleteNote(req.params.id, userId);
        if (!result) {
            return res.status(404).json({ status: 404, message: "Silinəcək qeyd tapılmadı" });
        }
        res.status(200).json({ status: 200, message: "Qeyd uğurla silindi" });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};