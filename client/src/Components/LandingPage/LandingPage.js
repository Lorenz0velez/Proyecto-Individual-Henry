import React from "react";
import './LandingPage.css';
import { Link } from "react-router-dom";

export default function LandingPage(){

    return(
        <div className="conteiner-landing">
            <div>
            <h1 className="welcomeH1">BIENVENIDO A MI PROYECTO INDIVIDUAL DE SOYHENRY!</h1>
            </div>

            <Link to={'/countries'} style={{ textDecoration: 'none' }} >
                <a href="/" className="bn13">¡VAMOS!</a>
            </Link>
        </div>
    )
}