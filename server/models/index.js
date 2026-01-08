// Folder və Note arasında əlaqə
Folder.hasMany(Note, { foreignKey: 'folder_id' });
Note.belongsTo(Folder, { foreignKey: 'folder_id' });