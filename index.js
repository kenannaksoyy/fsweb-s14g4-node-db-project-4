const server  = require("./api/server.js");
require("dotenv").config();
const port = process.env.port || 9000;

server.listen(port, ()=>{
    console.log(`${port} dinleniyor`);
});

// npm i -D nodemon devdepency kurulum
//knex init knexfile.js dosyamız oluşturulur
//knex seed:make 01_tarifler ile seed knex migrate:make create-tarifler migration dosyalarımızı oluşturduk,
//seed ve migration tamaladığımızda betikleri ile npm run migrate sonra npm run seed