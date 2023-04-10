import{ React, useEffect, useState} from 'react';
// import { Recipes } from './searchBar-prueba/Recipes';
import { useDispatch } from 'react-redux';
import { getAllCountries, getCountryByName } from '../../Redux/Actions/actions';
// import { getAllDogs, getDogsByName } from '../../Redux/Actions/actions';
import './SearchBar.css';





function SearchBar2({setCurrentPage}){

    const dispatch = useDispatch();
    const [state, setState] = useState("");

    const handleOnChange = (e) => {
        e.preventDefault();
        setState(e.target.value);
        if(!state || state === null || state === undefined){
            dispatch(getAllCountries())
        }
        console.log(state)
    }

    useEffect(() => {
        if (state === '') {
          dispatch(getAllCountries());
        }
      }, [state, dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        if(!state || state === undefined || state === null){
            alert("El input esta vacio")
            dispatch(getAllCountries())
        } else {
            dispatch(getCountryByName(state))
        }
    }


    return(
        <div>

        <form className='buscador' >

        <div>
        <input
        type='text'
        // name='name'
        placeholder='Search Country by name...'
        // value={state}
        className='inputBuscador'
        onChange={e => handleOnChange(e)}
        />
        </div>

        <button
         type="submit"
         className='searchButton' 
         onClick={e => handleSubmit(e)}
         >
         Search 
         </button>
        </form>
        </div>
    )
}

export default SearchBar2;
