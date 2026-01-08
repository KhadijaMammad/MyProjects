const Note = require("../models/notesModel");
const { Op } = require("sequelize");

const noteService = {

  async getAllNotes(userId, query = {}) {
    const { searchQuery, folderId, isFavorite, isDeleted } = query;

    // Ana filtr: hər zaman user_id-yə görə və silinib-silinmədiyinə görə
    const filter = {
      user_id: userId,
      is_deleted: isDeleted === true,
    };

    if (searchQuery) {
      filter[Op.or] = [
        { title: { [Op.iLike]: `%${searchQuery}%` } },
        { description: { [Op.iLike]: `%${searchQuery}%` } },
      ];
    }

    // Qovluq filtri
    if (folderId) {
      filter.folder_id = folderId;
    }

    // Favori filtri
    if (isFavorite) {
      filter.is_favorite = true;
    }

    return await Note.findAll({
      where: filter,
      order: [["created_at", "DESC"]],
    });
  },

  async getNoteById(id, userId) {
    return await Note.findOne({
      where: { id, user_id: userId },
    });
  },

  async createNote(noteData) {
    // noteData içində user_id və folder_id mütləq olmalıdır
    return await Note.create(noteData);
  },

  async updateNote(id, userId, updateData) {
    const [updatedRowsCount, updatedRows] = await Note.update(updateData, {
      where: { id, user_id: userId },
      returning: true,
    });

    return updatedRowsCount > 0 ? updatedRows[0] : null;
  },

//  SOFT DELETE: Notu tam silmir, is_deleted statusunu true edir (Zibil qutusu)
  
  async moveToTrash(id, userId) {
    return await Note.update(
      { is_deleted: true, deleted_at: new Date() },
      { where: { id, user_id: userId } }
    );
  },

//   RESTORE: Notu zibil qutusundan geri qaytarır

  async restoreFromTrash(id, userId) {
    return await Note.update(
      { is_deleted: false, deleted_at: null },
      { where: { id, user_id: userId } }
    );
  },

  // FAVORITE TOGGLE: Notu favorilərə əlavə edir və ya çıxarır
  async toggleFavorite(id, userId) {
    const note = await Note.findOne({ where: { id, user_id: userId } });
    if (!note) throw new Error("Not tapılmadı");

    return await note.update({ is_favorite: !note.is_favorite });
  },

  // HARD DELETE: Notu bazadan tamamilə silir (Zibil qutusundan təmizləmək üçün)
  async permanentlyDelete(id, userId) {
    return await Note.destroy({
      where: { id, user_id: userId, is_deleted: true },
    });
  },
};

module.exports = noteService;
