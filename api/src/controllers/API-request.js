const axios = require('axios');
const { Country, Activity } = require("../db");
axios.default.timeout = 30000;


const getAllCountriesAPI = async() =>{
    const countries = await axios.get(`https://restcountries.com/v3/all`);
    try{
      const mapCountries = countries.data?.map((data)=>{
        return {
        id: data.cca3,
        name: data.name.common,
        flag: data.flags[1],
        continent: data.continents[0],
        // capital: data.capital[0] ? data.capital[0] : data.capital,
        capital: data.capital != null ? data.capital[0] : "No data",
        subregion: data.subregion,
        area: data.area,
        population: data.population,
        createInDb: data.createInDb,  
        }
    });
  
    await Country.bulkCreate(mapCountries, { validate: true })
  
    } catch(e){
      console.log(e)
    }
  }

// getAllCountriesAPI();
module.exports={
    getAllCountriesAPI
}

