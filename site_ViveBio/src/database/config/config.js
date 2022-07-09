require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "vivebio_db",
    host: "localhost",
    dialect: "mysql",
    port : 3306
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
