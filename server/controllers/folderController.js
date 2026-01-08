const FolderService = require('../services/folderService');



const folderController = {
    async getAllFolders(req, res) {        
        try{
              const folders = await FolderService.getAllFolders(req.user.user_id);
              console.log(req.user.user_id);
              
              res.json({
                success: true,
                data: folders
              })
        }
        catch(err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async folderGetById (req, res) {
        try{
            const folderId = req.params.id;
            const folder = await FolderService.getFolderById(folderId, req.user.user_id);
            res.json({
                success: true,
                data: folder
            })
        }
        catch(err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async createFolder(req,res) {
        try{
            const { name } = req.body;
            const newFolder = await FolderService.createFolder(req.user.user_id, name);
            res.json({
                success: true,
                data: newFolder
            })
        }
        catch(err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async updatedFolder (req, res) {
        try{
            const folderId = req.params.id;
            const { name } = req.body;
            const updatedFolder = await FolderService.updatedFolder(folderId, req.user.user_id, name);
            res.json({
                success: true,
                data: updatedFolder
            })
        }
        catch(err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async deleteFolder (req, res) {
        try{
            const folderId = req.params.id;
            await FolderService.deleteFolder(folderId, req.user.user_id);
            res.json({
                success: true,
                message: 'Qovluq silindi'
            })
        }
        catch(err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async togglePin (req, res) {
        try {
            const { id } = req.params;
            const updated = await FolderService.togglePin(id, req.user.user_id);
            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = folderController;