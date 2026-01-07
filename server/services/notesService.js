const Note = require('../models/notesModel');
const { Op } = require('sequelize');

const getAllNotes = async (userId, searchQuery = '') => {
    const filter = { user_id: userId };

    if (searchQuery) {
        filter.title = { [Op.iLike]: `%${searchQuery}%` };
    }

    return await Note.findAll({
        where: filter,
        order: [['created_at', 'DESC']] 
    });
};

const getNoteById = async (id, userId) => {
    return await Note.findOne({ 
        where: { id, user_id: userId } 
    });
};

const createNote = async (noteData) => {
    return await Note.create(noteData);
};

const updateNote = async (id, userId, updateData) => {
    const [updatedRowsCount, updatedRows] = await Note.update(updateData, {
        where: { id, user_id: userId },
        returning: true, 
    });

    if (updatedRowsCount > 0) {
        return updatedRows[0];
    }
    return null;
};

const deleteNote = async (id, userId) => {
    return await Note.destroy({ 
        where: { id, user_id: userId } 
    });
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};