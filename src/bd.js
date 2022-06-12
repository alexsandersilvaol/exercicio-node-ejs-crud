const { Client } = require('pg');

const client = new Client({
    user: 'adicione o usuario',
    host: 'adicione o host',
    database: 'adicione o nome banco de dados',
    password: 'adicione a senha do usuario',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;