const { Client } = require("pg");

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});
client.connect().then(()=> {console.log("Database connected successfully")});
module.exports = client;