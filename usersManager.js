const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'firsteverdatabase.cho530xxnkme.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thed0ct0r',
    database: 'users'
});

module.exports = {
    getUserByID: (id) => {
        return new Promise((resolve, reject) => {
            //  connection.connect();        
            connection.query(`SELECT * from drill where id=${id}`, function (error, results, fields) {
                //      connection.end();
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
            connection.query(`INSERT INTO drill (first_name, last_name, id, password)
                               VALUES ('${first_name}', '${last_name}', '${id}', '${password}');`, function (error, results, fiels) {
                connection.end();
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
            // connection.connect();
            connection.query(`SELECT * from drill where id='${id}' AND password='${password}'`, function (error, results, fiels) {
                //     connection.end();
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
                if (error) reject(error);
                resolve(results[0]);
            })
        })
    },
    deleteRecord: async (id) => {
        return new Promise((resolve, reject) => {
            //gonna check if the record is not deleted allready.
            let x = connection.query(`SELECT * from drill WHERE id='${id}'`);
            let d = new Date();
            d = d.toISOString();
            connection.query(`UPDATE drill SET delete_date = '${d}' WHERE id='${id}'`, function (error, results, fields) {
                if (error) reject(error);
                console.log(results);
                resolve(results[0]);
            }
                //     })
                // }
                // else reject(`User deleted on ${x}`);
            )
        })
    }
}
