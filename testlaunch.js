const express = require('express');
const { expect } = require('chai');
const supertest = require('supertest');
const app = express();

// Importe o router que você quer testar
const router = require('./routers/launch.js');

// Simula uma solicitação HTTP para testar as rotas
const request = supertest(app);

describe('Testes de Rota', () => {
  it('Deveria obter todos os lançamentos', async () => {
    const response = await request.get('/');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Deveria obter um lançamento específico', async () => {
    const response = await request.get('/id-do-lancamento');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria criar um novo lançamento', async () => {
    const response = await request.post('/').send({ /* dados do lançamento */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria atualizar um lançamento existente', async () => {
    const response = await request.put('/id-do-lancamento').send({ /* dados de atualização */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Deveria excluir um lançamento', async () => {
    const response = await request.delete('/id-do-lancamento');
    expect(response.status).to.equal(200);
    expect(response.body).to.equal('Launch deleted');
  });
});
