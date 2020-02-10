const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: 'admin',
    password: '',
    database: 'users'
});

module.exports = {
    getUserByID: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * from drill where id=${id}`, function (error, results, fields) {
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
            connection.query(`INSERT INTO drill (first_name, last_name, id, password)
                               VALUES ('${first_name}', '${last_name}', '${id}', '${password}');`, function (error, results, fiels) {
                if (error) reject(error);
                resolve({
                    data: `${first_name} added succesefully`,
                    error: null
                });
            });
        })
    },
    login: async ({
        id,
        password
    }) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * from drill where id='${id}' AND password='${password}'`, function (error, results, fiels) {
                if (error) reject(error);
                resolve(results[0]);
            })
        })
    },
    changeDetails: async ({
        id,
        change,
        changeTo
    }) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE drill SET ${change} = '${changeTo}' WHERE id='${id}'`, function (error, results, fields) {
                // if (results) resolve(results[0])
                // else reject(error);
                if (error) reject(error);
                else resolve(results[0]);
            })
        });
    },
    deleteRecord: async (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * from drill WHERE id='${id}'`, function (error, results, fields) {
                if (error) return reject(error);
                let message;
                if (results[0]) {
                    let deleted_date = results[0].delete_date;
                    if (deleted_date)
                        message = `User deleted on ${deleted_date}`;
                }
                else message = 'User not found';
                if(message) return reject(message); 
                let d = new Date();
                d = d.toISOString();
                connection.query(`UPDATE drill SET delete_date = '${d}' WHERE id='${id}'`, function (error, results, fields) {
                    if (error) return reject(error);
                    resolve(results[0]);
                })
            });
        })
    }
}
