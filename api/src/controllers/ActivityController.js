const { Country, Activity } = require("../db");
const { Op } = require('sequelize');



const getActivities = async(name) => {
    try {
        let dbActivities = await Activity.findAll({
            include: {
              model: Country,
              attributes: ["name", "id"],
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

          return dbActivities;
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  if (!name || !difficulty || !duration || !season || !countries) 
      return res.status(404).send({msg: 'Required data is missing'})
  try {
      const [instance, created] = await Activity.findOrCreate({
          where: {
              name: name,
          },
          defaults: {
              name: name,
              difficulty: difficulty,
              duration: duration,
              season: season,
          }
      });
      if(created) {
          let relateCountries = await Country.findAll({
              where: {
              name: {
                  [Op.in]: countries
              }
              }}
          )          
          relateCountries?.forEach(c => c.addActivity(instance));
          return res.send({msg: 'Activity created successfully'})
      } else {
          return res.status(404).send({msg: "There is an activity by that name already"});
      }
  } catch (error) {
  console.log(error)
  }
}

  module.exports={
    // createANewActivity,
    postActivity,
    getActivities
  }
  