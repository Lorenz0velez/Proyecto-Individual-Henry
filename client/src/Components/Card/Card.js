import React from "react";
import './Card.css';
import { Link } from "react-router-dom";


export default function Card({name, flag, continent, id}){


    return(
        <div className='conteiner' >
            <div className="product" >
            {/* <Link to={`/recipes/${id}`} > */}
                <div className="image" >
                <img src={flag} alt='imagen no encontrada' className="image" />
                </div>
                {/* </Link> */}
                <div className="namePrice" >
                    <h3>{name}</h3>
                </div>
                <div>
                    <p>{continent}</p>
                </div>
                
                <Link to={`/countries/${id}`} style={{ textDecoration: 'none' }}>
                <div className="bay" >
                <button className="button1">
                   LEER MAS
                <div className="arrow-wrapper">
                <div className="arrow"></div>
                </div>
                </button>
                </div>
                </Link> 
                
                    
            </div>
        </div>
    )
}