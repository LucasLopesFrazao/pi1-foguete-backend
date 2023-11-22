const express = require('express');
const { expect } = require('chai');
const supertest = require('supertest');
const app = express();

// Importe o router que você quer testar
const router = require('./routers/sensor');

// Simula uma solicitação HTTP para testar as rotas
const request = supertest(app);

describe('Testes de Rota para Sensores', () => {
  it('Deveria obter todos os sensores', async () => {
    const response = await request.get('/sensors');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Deveria obter um sensor específico', async () => {
    const response = await request.get('/sensors/id-do-sensor');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria criar um novo sensor', async () => {
    const response = await request.post('/sensors').send({ /* dados do sensor */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria atualizar um sensor existente', async () => {
    const response = await request.put('/sensors/id-do-sensor').send({ /* dados de atualização */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria excluir um sensor', async () => {
    const response = await request.delete('/sensors/id-do-sensor');
    expect(response.status).to.equal(200);
    expect(response.body).to.equal('Sensor deleted');
  });
});
