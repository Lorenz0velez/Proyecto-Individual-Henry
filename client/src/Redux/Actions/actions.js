import axios from 'axios';
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const A_to_Z = "A_to_Z";
export const Z_to_A = "Z_to_A";
export const MAYOR_POBLACION = "MAYOR_POBLACION";
export const MENOR_POBLACION = "MENOR_POBLACION";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const CONTINENT_FILTER = "CONTINENT_FILTER";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";


// export const getAllCountries = () => async dispatch => {
//     return fetch(`http://localhost:3001/countries`)
//     .then(response => response.json())
//     .then(json => {
//         dispatch({ type: GET_ALL_COUNTRIES, payload: json})
//     })
// };
export const getAllCountries = () => {
  return async function(dispatch){
    try{
      let json = axios.get(`http://localhost:3001/countries`)
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: (await json).data
      })
    }catch(error){
    console.log(error);
    alert(error);
    }
  } 
}

export const getCountryByName = (name) =>{
    return async function(dispatch){
        try {
            var json = axios.get(`http://localhost:3001/countries?name=${name}`)
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                // payload: json.data
                payload: (await json).data
            })
        } catch (error) {
            console.log(error)
            alert("Country Not Found")
        }
    }
}

export const getCountryById = (id) =>{
    return async function (dispatch) {
        try {
            var json = axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: (await json).data
            })
        } catch (error) {
            console.log(error)
            alert("Country Not Found")
        }
    }
}

export const filter_A_TO_Z = (payload) => {
    return {
      type: A_to_Z,
      payload
    }
};


export const filter_Z_TO_A = () => {
  return {
    type: Z_to_A,
    // payload
  }
};
export const filter_mayor_poblacion = () => {
    return{
      type: MAYOR_POBLACION,
    }
  }

  export const filter_menor_poblacion = () => {
    return{
      type: MENOR_POBLACION,
    }
  }

  export const createNewActivity22 = (country) => {
    return async function (dispatch){
      try {
        const response = await axios.post(`http://localhost:3001/activities`)
        dispatch({
          type: CREATE_ACTIVITY,
          payload: response.data,
        })
        alert("Creado correctamente");
      } catch (error) {
        alert("Algo salio mal");
        console.log(error)
      }
    }
  }

// export const createNewActivity = (country) => async (dispatch) => {

//     let newActivity = {
//       name: country.name,
//       difficulty: country.difficulty,
//       duration: country.duration,
//       season: country.season,
//     };
//     try {
//       await axios.post(`http://localhost:3001/dogs`, newActivity).then(alert('Creado'));
//     } catch (error) {
//     //   dispatch({ type: ERROR, payload: error.message });
//     alert("algo salio mal")
//     console.log(error)
//     }
//   };
// export const createNewActivity = (country) => async (dispatch) => {

//     let newActivity = {
//       name: country.name,
//       difficulty: country.difficulty,
//       duration: country.duration,
//       season: country.season,
//     };
//     try {
//       await axios.post(`http://localhost:3001/activities`, newActivity).then(alert('Creado Culiau'));

//     } catch (error) {
//     //   dispatch({ type: ERROR, payload: error.message });
//     alert("algo salio mal!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//     console.log(error)
//     }
//   };
export const createNewActivity = (payload) => {
  return async function (dispatch) {
    try {
      var response = await axios.post(`http://localhost:3001/activities`, payload);
      return response
    } catch (e) {
      alert(e)
    }        
  }
};

  export function getAllActivities(){
    return async function (dispatch){
        var json=await axios.get(`http://localhost:3001/activities`)
        return dispatch({
          type: GET_ALL_ACTIVITIES,
          payload: json.data
        });
    }
  } 

  export const filterByContinent = (payload) => {
    return {
      type: CONTINENT_FILTER,
      payload
    }
};


  