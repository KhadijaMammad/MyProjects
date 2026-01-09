const FolderModel = require("../models/folderModel");
const { Sequelize, Op } = require("sequelize");

const folderService = {
  async getAllFolders(userId, searchQuery = '') {
    const whereClause = { user_id: userId };

    if (searchQuery) {
      whereClause.name = { [Op.iLike]: `%${searchQuery}%` };
    }

    return await FolderModel.findAll({
      where: whereClause,
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM notes WHERE notes.folder_id = "Folder".id AND notes.is_deleted = false)`
            ),
            "notesCount",
          ],
        ],
      },
      order: [
        ["is_pinned", "DESC"],
        ["created_at", "DESC"],
      ],
    });
  },

  async getFolderById(id, userId) {
    return await FolderModel.findOne({
      where: {
        id: id,
        user_id: userId
      }
    });
  },

  async createFolder(userId, name) {
    return await FolderModel.create({ user_id: userId, name });
  },

  async updatedFolder(folderId, userId, name) {
    const [updatedRowsCount, updatedRows] = await FolderModel.update(
      { name }, {
      where: {
        id: folderId,
        user_id: userId
      },
      returning: true 
    }
    );
    return updatedRowsCount > 0 ? updatedRows[0] : null;
  },

  async deleteFolder(folderId, userId) {
    return await FolderModel.destroy({
      where: {
        id: folderId,
        user_id: userId
      }
    });
  },

  async togglePin(folderId, userId) {
    const folder = await FolderModel.findOne({ where: { id: folderId, user_id: userId } });
    if (!folder) throw new Error('Qovluq tapılmadı');
    return await folder.update({ is_pinned: !folder.is_pinned });
  }
};

module.exports = folderService;