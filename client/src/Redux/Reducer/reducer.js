import { A_to_Z, CONTINENT_FILTER, CREATE_ACTIVITY, GET_ALL_ACTIVITIES, GET_ALL_COUNTRIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, MAYOR_POBLACION, MENOR_POBLACION, Z_to_A } from "../Actions/actions";

const initialState = {
    allCountries: [],
    countryDetail: {},
    countryCreated: [],
    countriesFiltered: [],
    allActivities: [],
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){

        case GET_ALL_COUNTRIES:
            return{
                ...state,
                allCountries: action.payload,
                countriesFiltered: action.payload,
            };

        case GET_COUNTRY_BY_NAME:
            return{
                ...state,
                // allCountries: action.payload,
                // countriesFiltered: action.payload,
                countriesFiltered: action.payload !== [] ? action.payload : alert('Perro no encontrado')
                // allCountries: action.payload !== [] ? action.payload : alert('Perro no encontrado'),
            };

        case GET_COUNTRY_BY_ID:
            return{
                ...state,
                countryDetail: action.payload,
            }

            case A_to_Z:
                const rtaAtoZ =[
                    ...state.countriesFiltered.sort(function(a, b){
                       if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                       if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                       return 0;
                   })
                   ]
                return{
                    ...state,
                    // allCountries: rtaAtoZ,
                    countriesFiltered: rtaAtoZ
                }
    
            case Z_to_A:
                const rtaZtoA =[
                 ...state.countriesFiltered.sort(function(a, b){
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
                    return 0;
                })
                ]
                  return {
                    ...state,
                    // allCountries:rtaZtoA,
                    countriesFiltered: rtaZtoA
                  }

            case MAYOR_POBLACION:
                    let up = [...state.countriesFiltered.sort((a, b) => b.population - a.population)];
                    return {
                      ...state,
                    //   allCountries: up,
                    countriesFiltered: up
                    };
      
              
              case MENOR_POBLACION:
                    let down = [...state.countriesFiltered.sort((a, b) => a.population - b.population)];
                    return {
                      ...state,
                    //   allCountries: down,
                    countriesFiltered: down
                    };


            
            case CREATE_ACTIVITY:
                return{
                    ...state,
                    countryCreated: action.payload
                }

        // case CONTINENT_FILTER:
        //     let continentFilter = [
        //         ...state.countriesFiltered.filter(({continent}) => action.payload.includes(continent))
        //     ]
        //     return{
        //         ...state,
        //         countriesFiltered: continentFilter
        //     }
        case CONTINENT_FILTER:
            const toFilterByContinent = state.allCountries;
            // const filteredByContinent = action.payload === 'Asia' || 'Africa' || 'North America' || 'South America' || 'Antarctica' || 'Europe' || 'Oceania' ? 
            //     toFilterByContinent : 
            //     toFilterByContinent.filter(c => c.continent === action.payload)
            const filteredByContinent = action.payload === 'All' ? 
            toFilterByContinent : 
            toFilterByContinent.filter(c => c.continent === action.payload)
            return{
                ...state,
                countriesFiltered: filteredByContinent
            }

            

            case GET_ALL_ACTIVITIES:
                return{
                    ...state,
                    allActivities: action.payload
                }




        default:
            return state;
    }
}

export default rootReducer;