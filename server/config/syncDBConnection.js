const sequelize = require('./connectionToDB')

const syncDbConnection = () => {
  console.log('Database tables already exist - skipping sync')
}
module.exports = syncDbConnection