const express = require('express');
const { expect } = require('chai');
const supertest = require('supertest');
const app = express();

// Importe o router que você quer testar
const router = require('./routers/rocket.js');

// Simula uma solicitação HTTP para testar as rotas
const request = supertest(app);

describe('Testes de Rota para Rockets', () => {
  it('Deveria obter todos os foguetes', async () => {
    const response = await request.get('/rockets');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Deveria obter um foguete específico', async () => {
    const response = await request.get('/rockets/id-do-foguete');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria criar um novo foguete', async () => {
    const response = await request.post('/rockets').send({ /* dados do foguete */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria atualizar um foguete existente', async () => {
    const response = await request.put('/rockets/id-do-foguete').send({ /* dados de atualização */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria excluir um foguete', async () => {
    const response = await request.delete('/rockets/id-do-foguete');
    expect(response.status).to.equal(200);
    expect(response.body).to.equal('Rocket deleted');
  });
});
