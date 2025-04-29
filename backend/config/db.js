const hana = require('@sap/hana-client');

const connParams = {
    serverNode: process.env.SERVER_NODE, 
    uid: process.env.DB_USERNAME,
    pwd: process.env.DB_PASSWORD
};

const connection = hana.createConnection();

const connectDB = async () => {
    return new Promise((resolve, reject) => {
        connection.connect(connParams, (err) => {
            if (err) {
                console.error('ERROR al conectar SAP HANA:', err); // <--- agrega este console
                reject(err);
            } else {
                console.log('Conexión exitosa SAP HANA'); // <--- agrega este console
                resolve(connection);
            }
        });
    });
};

module.exports = { connection, connectDB };