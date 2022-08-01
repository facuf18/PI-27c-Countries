/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest');
const app = require('../../src/app.js');
const { expect } = require('chai');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: 'ARG',
  name: 'Argentina',
  flag_img: 'url',
  continent: 'South America',
  capital: 'Buenos Aires'
};

/* describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
}); */

describe('Country detail route', () => {
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries/:id', () => {
    it('responds with 200', async () => {
      await agent.get('/countries/ARG').expect(200);
    });
    it('responds with the correct country', async () => {
      await agent.get('/countries/ARG').then(res => expect(res.body.name).to.eql(country.name));
    });
    it('responds with 400 if the id does not matches', async () => {
      await agent.get('/countries/BRA').expect(400);
    });
  });
});