import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryById } from "../../Redux/Actions/actions";
import axios from "axios";
import './CardDetail.css'



// export default function CardDetail({id, image, name, temperaments, height, weight, life_span}){
    // export default function CardDetail({match}){
        export default function CardDetail(){

    const countryDetail = useSelector(state => state.countryDetail);


    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getCountryById(id))
   }, [dispatch, id]);


    return(
        <div className="cardDetail-conteiner" >
            <img className="flag" src={countryDetail.flag} alt="No se encunetra la foto" />
            {/* <Link to={`/countries`}>
            <button className="boton-back">BACK TO HOME</button>
            </Link> */}
            <div className="id" ><h3>ID: {countryDetail.id}</h3></div>
            <div className="name" ><h3>Name: {countryDetail.name}</h3></div>
            <div className="population" ><h3>Population: {countryDetail.population}</h3></div>
            <div className="continent" ><h3>Continent: {countryDetail.continent}</h3></div>
            <div className="area" > <h3>Area: {countryDetail.area}</h3></div>
            <div className="subregion" > <h3>Subregion: {countryDetail.subregion}</h3></div>
            <div className="capital" ><h3>Capital: {countryDetail.capital}</h3></div>
            <Link to={`/countries`}>
            <button className="boton-back">BACK TO HOME</button>
            </Link>
        </div>
    )
}