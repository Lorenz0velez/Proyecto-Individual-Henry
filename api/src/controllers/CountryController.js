const { Country, Activity } = require("../db");
const { getAllCountriesAPI } = require("./API-request");




const getCountries = async (name) => {
  try {
    let dbDogs = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: {
            attributes: []
        }
      }, order: [[
        'name', 'ASC'
      ]]
    });

    if (name) {
      return await dbDogs.filter((dog) =>
        dog.name.trim().toLowerCase().includes(name.trim().toLowerCase())
      );
    }

    // console.log("dbDogs:", dbDogs);
    return dbDogs

  } catch (err) {
    console.log(err)
    next(err)
  }
}

const getCountryById = async (id) => {
  const allCountries = await getCountries();
  const apiCountry = allCountries.find((pais) => pais.id == id);
  if (!apiCountry) {
    throw new Error(`Dog's id not found`);
  }
  return apiCountry;
};



module.exports = {
  getCountries,
  getCountryById,

}