const noteService = require('../services/notesService');

const getAll = async (req, res) => {
    try {
        const userId = req.user.user_id;
        
        const filters = {
            searchQuery: req.query.search,        // ?search=salam
            folderId: req.query.folderId,         // ?folderId=5
            isFavorite: req.query.favorite === 'true', // ?favorite=true
            isDeleted: req.query.trash === 'true'      // ?trash=true
        };

        const notes = await noteService.getAllNotes(userId, filters);
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const note = await noteService.getNoteById(req.params.id, userId);
        if (!note) {
            return res.status(404).json({ success: false, message: "Qeyd tapılmadı" });
        }
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { title, description, folder_id } = req.body;
        const userId = req.user.user_id;
        
        const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        const newNote = await noteService.createNote({ 
            user_id: userId, 
            folder_id, 
            title, 
            description,
            images: imagePaths
        });
        
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const updatedNote = await noteService.updateNote(req.params.id, userId, req.body);
        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Yenilənəcək qeyd tapılmadı" });
        }
        res.status(200).json({ success: true, data: updatedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- YENİ ƏLAVƏ OLUNAN FUNKSİYALAR ---

// Notu zibil qutusuna at (Soft Delete)
const moveToTrash = async (req, res) => {
    try {
        const userId = req.user.user_id;
        await noteService.moveToTrash(req.params.id, userId);
        res.status(200).json({ success: true, message: "Qeyd zibil qutusuna atıldı" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Zibil qutusundan geri qaytar
const restore = async (req, res) => {
    try {
        const userId = req.user.user_id;
        await noteService.restoreFromTrash(req.params.id, userId);
        res.status(200).json({ success: true, message: "Qeyd bərpa olundu" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Favori statusunu dəyiş (Toggle)
const toggleFavorite = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const updated = await noteService.toggleFavorite(req.params.id, userId);
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Bazadan birdəfəlik sil (Hard Delete)
const hardDelete = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const result = await noteService.permanentlyDelete(req.params.id, userId);
        if (!result) {
            return res.status(404).json({ success: false, message: "Silinəcək qeyd tapılmadı" });
        }
        res.status(200).json({ success: true, message: "Qeyd bazadan tamamilə silindi" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    moveToTrash,
    restore,
    toggleFavorite,
    hardDelete
};