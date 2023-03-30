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

// const createANewActivity = async(req, res, next) => {
//     const {
//       name,
//       difficulty,
//       duration,
//       season,
//     } = req.body ;
  
//       if (!name || !difficulty || !duration || !season) {
//         return res.status(404).send({msg: 'Required data is missing'})
//         }
//      try{
  
//       const newActivity = await Activity.create({
//         name,
//         difficulty,
//         duration,
//         season,
//       });
  
//       const country = await Country.findAll({
//         where: { name: name },
//       });
//       await newActivity.addCountry(country);
  
//       const sendNewActivity = await Activity.findAll({
//         where: { name: name },
//         include: {
//           model: Country,
//           attributes: ["name"],
//           through: {
//             attributes: [],
//           },
//         },
//       });
  
//       console.log("sendNewDog:", sendNewActivity); 
//       res.status(200).json(sendNewActivity);
//       // console.log("newDog:", newDog);
//   } catch(err) {
//     console.log(err)
//     next(err)
//   } 
//   }

//   const postActivity = async (req, res) => {
//     const { name, difficulty, duration, season, countries } = req.body;
//     if (Array.isArray(countries)){
//       countries.join(",")
//     }
//     console.log("countries que viene por body:", countries)


//     if(!name){
//        console.log("FALTA UN NAME")
//       return res.status(404).send({msg: 'Required data is missing NAME'})
//     } else if(!difficulty){
//       console.log("FALTA UN DIFFICULTY")
//      return res.status(404).send({msg: 'Required data is missing DIFFICULTY'})
//    } else if(!duration){
//     console.log("FALTA UN DURATION")
//    return res.status(404).send({msg: 'Required data is missing DURATION'})
//  }else if(!season){
//   console.log("FALTA UN SEASON")
//  return res.status(404).send({msg: 'Required data is missing SEASON'})

// } else if(!countries || countries.length === 0){
//   console.log("FALTA UN COUNTRIES")
//   return res.status(404).send({msg: 'Required data is missing COUNTRIES'})

// } else {
//   console.log("TA TO BIEN")
//   try {

//     // if (req.body && req.body.countries && !Array.isArray(req.body.countries)) {
//     //   req.body.countries = [req.body.countries];
//     // }
//     // if (Array.isArray(countries)){
//     //   countries = countries.join(",")
//     // }
//     // console.log("countries que viene por body:", countries)

//     const [instance, created] = await Activity.findOrCreate({
//         where: {
//             name: name,
//         },
//         defaults: {
//             name: name,
//             difficulty: difficulty,
//             duration: duration,
//             season: season,
//         }
//     });
//     if(created) {
//         let relateCountries = await Country.findAll({
//             where: {
//             name:{
//                 [Op.in]: [countries]
//             } 
//             }}
//         )
//         console.log("relateCountries:", relateCountries)
//         console.log("instance:", instance)
//         relateCountries?.forEach(c => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA:", c));
//         // console.log("relateCountries despues de pasarle instance:", relateCountriesWithActivity)

//         return res.json(instance)
//     } else {
//         return res.status(404).send({msg: "There is an activity by that name already"});
//     }
// } catch (error) {
// console.log(error)
// console.log('HAY UN ERROR')
// }
// }



    // try {
    //     const [instance, created] = await Activity.findOrCreate({
    //         where: {
    //             name: name,
    //         },
    //         defaults: {
    //             name: name,
    //             difficulty: difficulty,
    //             duration: duration,
    //             season: season,
    //         }
    //     });
    //     if(created) {
    //         let relateCountries = await Country.findAll({
    //             where: {
    //             name: {
    //                 [Op.in]: [countries]
    //             }
    //             }}
    //         )          
    //         relateCountries?.forEach(c => c.addActivity(instance));
    //         return res.json(instance)
    //     } else {
    //         return res.status(404).send({msg: "There is an activity by that name already"});
    //     }
    // } catch (error) {
    // console.log(error)
    // console.log('HAY UN ERROR')
    // }
// }

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
  