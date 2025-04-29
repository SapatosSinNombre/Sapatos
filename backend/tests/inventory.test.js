// tests/inventory.test.js

jest.mock('@sap/hana-client');

const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

// Tokens para diferentes roles
const adminToken = jwt.sign(
  { id: 'test-admin-id', ROL: 'admin' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

const duenoToken = jwt.sign(
  { id: 'test-dueno-id', ROL: 'dueno' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

const empleadoToken = jwt.sign(
  { id: 'test-empleado-id', ROL: 'empleado' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

describe('Pruebas de inventario (admin)', () => {
  it('Admin debería traer todo el inventario', async () => {
    const res = await request(app)
      .get('/inventory')
      .set('Cookie', [`Auth=${adminToken}`])
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Admin debería poder buscar un producto por nombre', async () => {
    const res = await request(app)
      .get('/inventory')
      .set('Cookie', [`Auth=${adminToken}`])
      .expect(200);

    const found = res.body.find(item => item.nombre.includes('Playera Básica'));
    expect(found).toBeDefined();
  });

  it('Admin debería poder buscar un producto por proveedor', async () => {
    const res = await request(app)
      .get('/inventory')
      .set('Cookie', [`Auth=${adminToken}`])
      .expect(200);

    const found = res.body.find(item => item.proveedor === 'ModaRopa');
    expect(found).toBeDefined();
  });

  it('Admin debería poder buscar un producto por categoría', async () => {
    const res = await request(app)
      .get('/inventory')
      .set('Cookie', [`Auth=${adminToken}`])
      .expect(200);

    const found = res.body.find(item => item.categoria === 'Playera');
    expect(found).toBeDefined();
  });

  it('Admin debería agregar un producto nuevo (simulado)', async () => {
    const newItem = {
      id: 2,
      proveedor: 'ZapatosFinos',
      nombre: 'Zapato de vestir',
      categoria: 'Zapatos',
      stockActual: 50,
      stockMinimo: 10,
      fechaUltimaCompra: '2024-03-01',
      fechaUltimaVenta: '2024-04-01',
      precioCompra: 80.00,
      precioVenta: 150.00
    };

    const res = await request(app)
      .post('/inventory')
      .set('Cookie', [`Auth=${adminToken}`])
      .send(newItem)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message.toLowerCase()).toContain('agregado');
  });

  it('Admin debería actualizar un producto existente (simulado)', async () => {
    const updatedItem = {
      proveedor: 'ModaRopa',
      nombre: 'Playera Premium',
      categoria: 'Playera',
      stockActual: 120,
      stockMinimo: 30,
      fechaUltimaCompra: '2024-04-01',
      fechaUltimaVenta: '2024-04-10',
      precioCompra: 60.00,
      precioVenta: 110.00
    };

    const res = await request(app)
      .put('/inventory/1')
      .set('Cookie', [`Auth=${adminToken}`])
      .send(updatedItem)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message.toLowerCase()).toContain('actualizado');
  });

  it('Admin debería eliminar un producto (simulado)', async () => {
    const res = await request(app)
      .delete('/inventory/1')
      .set('Cookie', [`Auth=${adminToken}`])
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message.toLowerCase()).toContain('eliminado');
  });
});

describe('Pruebas de inventario (dueño)', () => {
  it('Dueño debería traer todo el inventario', async () => {
    const res = await request(app)
      .get('/inventory')
      .set('Cookie', [`Auth=${duenoToken}`])
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('Pruebas de inventario (empleado)', () => {
  it('Empleado debería traer todo el inventario', async () => {
    const res = await request(app)
      .get('/inventory')
      .set('Cookie', [`Auth=${empleadoToken}`])
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

