const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

const country = {
  id: 'ARG',
  name: 'Argentina',
  flag_img: 'url',
  continent: 'South America',
  capital: 'Buenos Aires'
};


describe('Country model', () => {
  before(async () => await Country.sync({ force: true }));
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  it('should throw an error if is null', async () => {
    try {
      await Country.create({});
    } catch (error) {
      expect(error.message).to.include('cannot be null');
    }
  });
  it('should work when its a valid country', async () => {
    await Country.create(country);
  });
  it('should throw an error if id is repeated', async () => {
    try {
      await Country.create(country);
    } catch(error) {
      expect(error.message).to.include('llave duplicada');
    }
  })
});
