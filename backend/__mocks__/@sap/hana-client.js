const connectionMock = {
    exec: jest.fn((query, params, callback) => {
      if (query.includes('FROM')) {
        callback(null, [
          {
            ID: 1,
            PROVEEDOR: 'ModaRopa',
            NOMBRE: 'Playera Básica',
            CATEGORIA: 'Playera',
            STOCKACTUAL: 100,
            STOCKMINIMO: 20,
            FECHAULTIMACOMPRA: '2024-01-01',
            FECHAULTIMAVENTA: '2024-01-10',
            PRECIOCOMPRA: 50.00,
            PRECIOVENTA: 100.00
          }
        ]);
      } else {
        callback(null, []);
      }
    }),
    prepare: jest.fn((query, callback) => {
      const statement = {
        execute: (params, cb) => cb(null)
      };
      callback(null, statement);
    }),
    connect: jest.fn((params, callback) => {
      callback(null);
    })
  };
  
  module.exports = {
    createConnection: () => connectionMock
  };
  
