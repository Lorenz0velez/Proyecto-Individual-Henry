import React, { useEffect, useState } from 'react';

import './Navbar.css';
// import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import SearchBar2 from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { filterByContinent, filter_A_TO_Z, filter_mayor_poblacion, filter_menor_poblacion, filter_Z_TO_A, getAllCountries } from '../../Redux/Actions/actions';
// import { filterByStored, filterOfTemperaments, filter_A_TO_Z, filter_mayor_peso, filter_menor_peso, filter_Z_TO_A, getAllDogs, getTemperaments, newBreeds, sortByWeight, Z_to_A } from '../../Redux/Actions/actions';


export default function NavBar({setCurrentPage, setOrden}) {

  const dispatch = useDispatch();

  const [state, setState] = useState();
  const allCountries = useSelector(state => state.allCountries);
  const countriesFiltered = useSelector(state => state.countriesFiltered);
  

  const hanldeBackToOriginalHome = () => {
    dispatch(getAllCountries())
  }

  // state = allCountries;
  const handleFilterByContinent = (e) => {
    // setState(allCountries);
    // console.log(state)
    dispatch(filterByContinent(e.target.value))
    setCurrentPage(1)
  }


    return (
    <header className="navbar">
        
        <div className="dropdown" >

          <Link to="/countries" style={{ textDecoration: 'none' }}>
          <button className="button" onClick={hanldeBackToOriginalHome}>HOME</button>
          </Link>

        </div>
        <div className="dropdowns">
          <div className="dropdown">
            <button className="button">
              FILTERS
              {/* <img src="chevron.svg" /> */}
            </button>
            <div className="dropdown-menu" >
              <button onClick={ () => dispatch(filter_A_TO_Z()) } >{`A to Z`}</button>
              <button onClick={ () => dispatch(filter_Z_TO_A()) } >{`Z to A`}</button>
              <button onClick={ () => dispatch(filter_mayor_poblacion()) } >{`MAYOR POBLACION`}</button>
              <button onClick={ () => dispatch(filter_menor_poblacion()) } >{`MENOR PPOBLACION`}</button>
              {/* <button value='All' key='New Breeds' >{`NEW BREEDS`}</button> */}
            </div>
          </div>
        
          <div className="dropdown">
            <button className="button">
              CONTINENTS
            </button>
            {/* <div className="dropdown-menu" onChange={e => handleFilterByContinent(e)}> */}
            <div className="dropdown-menu" value='All' onChange={e => handleFilterByContinent(e)}>
              <button value="Asia" onClick={e => handleFilterByContinent(e)}>Asia</button>
              <button value="North America" onClick={e => handleFilterByContinent(e)}>North America</button>
              <button value="South America" onClick={e => handleFilterByContinent(e)}>South America</button>
              <button value="Africa" onClick={e => handleFilterByContinent(e)}>Africa</button>
              <button value="Antarctica" onClick={e => handleFilterByContinent(e)}>Antarctica</button>
              <button value="Europe" onClick={e => handleFilterByContinent(e)}>Europe</button>
              <button value="Oceania" onClick={e => handleFilterByContinent(e)}>Oceania</button>
            </div>
          </div>
          <div className="dropdown">
            <Link to={'/create_activity'} style={{ textDecoration: 'none' }}>
          <button className="button">
              CREATE NEW ACTIVITY
            </button>
            </Link>
          </div>
        </div>
        
            <SearchBar2 setCurrentPage={setCurrentPage}/>

        </header>
    )
}