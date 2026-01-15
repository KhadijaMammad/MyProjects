const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionToDB');

const GemTalk = sequelize.define('GemTalk', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id', // SQL-dəki sütun adı
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'topic'
    },
    rounds: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        field: 'rounds'
    },
    chat_history: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'chat_history'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'processing',
        field: 'status'
    },
    // created_at və updated_at sütunlarını Sequelize-in tanıması üçün:
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at' // SQL-dəki adı
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at' // SQL-dəki adı
    }
}, {
    tableName: 'gem_talks', // pgAdmin-də yaratdığın cədvəl adı
    freezeTableName: true,  // Adın dəyişdirilməsinə icazə vermə
    timestamps: true,       // created_at və updated_at-ı idarə et
    underscored: true       // CamelCase-dən snake_case-ə keçid
});

module.exports = GemTalk;