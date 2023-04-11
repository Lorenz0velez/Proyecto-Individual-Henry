import { React, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries } from "../../Redux/Actions/actions";
import Card from "../Card/Card";
import NavBar from "../Navbar/Navbar";
import Pagination from "../Pagination/Pagination";
import './Home.css'




export default function Home(){

    const dispatch = useDispatch();

    const allCountries = useSelector(state => state.allCountries);
    const countriesFiltered = useSelector(state => state.countriesFiltered);


    function consologueando(){
        console.log("allCountries:",allCountries);
        console.log("countriesFiltered:",countriesFiltered);
    }
    consologueando();

    useEffect(()=>{
        dispatch(getAllCountries())
    },[dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);

    const paginado = (actualPage) =>{
        setCurrentPage(actualPage)
    }

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    
    // const currentCountries = allCountries?.slice(indexOfFirstCountry, indexOfLastCountry)
    const currentCountries = (countriesFiltered.length ? countriesFiltered : allCountries).slice(indexOfFirstCountry, indexOfLastCountry)

    return(
        <div className="conteinerHome">


            <NavBar setCurrentPage={setCurrentPage}/>

            <div>
                <Pagination
                allCountries={(countriesFiltered.length ? countriesFiltered : allCountries ).length}
                countriesPerPage={countriesPerPage}
                pagination={paginado}
                />
            </div>

            {
                // countries ? countries : allCountries.map((c)=>{
                    currentCountries?.map((c)=>{
                    return(
                        <Card
                        key={c.id}
                        id={c.id}
                        name={c.name}
                        flag={c.flag}
                        continent={c.continent}
                        />
                    )
                })
            }
        </div>
    )
}