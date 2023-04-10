/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { getAllCountriesAPI } = require('../../src/controllers/API-request.js');
const { getCountries } = require('../../src/controllers/CountryController.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id:"ARG",
  name: 'Argentina',
  flag: "https://flagcdn.com/w320/br.png",
  continent: "South America",
  capital: "Buenos Aires",
  population: 46878990
};

describe('Country routes', () => {
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
});
