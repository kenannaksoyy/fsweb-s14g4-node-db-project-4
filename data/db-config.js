const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.node_env || "development";

module.exports = knex(config[environment]);
//db-config dosyamızı oluşturduk knex tablo yapıcısı