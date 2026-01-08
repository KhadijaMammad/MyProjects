const FolderModel = require("../models/folderModel");
const { Sequelize } = require("sequelize");

const getAllFolders = {
  async getAllFolders(userId) {
    return await FolderModel.findAll({
      where: { user_id: userId },
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
    return await Folder.create({ user_id: userId, name });
  },

  async updatedFolder(folderId, userId, name) {
    return await FolderModel.update(
        {name}, {
            where: {
                id: folderId,
                user_id: userId
            }
        }
    )
  },

  async deleteFolder(folderId, userId) {
    return await FolderModel.destroy({
        where: {
            id: folderId,
            user_id: userId
        }
    })
  },

  async togglePin(folderId, userId) {
        const folder = await FolderModel.findOne({ where: { id: folderId, user_id: userId } });
        if (!folder) throw new Error('Qovluq tapılmadı');
        return await folder.update({ is_pinned: !folder.is_pinned });
    }
};

module.exports = getAllFolders;