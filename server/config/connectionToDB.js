require('dotenv').config()
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_PORT || 5432,
    logging: false,
  }
);

console.log('DB USER:', process.env.POSTGRES_USER);
console.log('DB PASS:', process.env.POSTGRES_PASSWORD);
console.log('DB NAME:', process.env.POSTGRES_DATABASE);


sequelize.authenticate()
  .then(() => console.log("Database successfully connected"))
  .catch(err => console.log("Database connection error:", err));

module.exports = sequelize;
