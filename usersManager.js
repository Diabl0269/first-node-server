const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'firsteverdatabase.cho530xxnkme.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thed0ct0r',
    database: 'drill'
});

module.exports = {
    getUserByID: (id) => {
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(`SELECT * from users where id=${id}`, function (error, results, fields) {
                connection.end();
                if (error) reject(error);
                resolve(results[0]);
            });
        })
    },
    addUser: async ({
        first_name,
        last_name,
        id,
        password
    }) => {
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(`INSERT INTO users (first_name, last_name, id, password)
                               VALUES ('${first_name}', '${last_name}', '${id}, '${password});`, function(error, results, fiels) {
                                   connection.end();
                                   if(error) reject(error);
                                   resolve({
                                       data: `${first_name} added succesefully 
                                   })
                               }
        })
    }
}