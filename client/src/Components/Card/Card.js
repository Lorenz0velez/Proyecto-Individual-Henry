import React from "react";
import './Card.css';
import { Link } from "react-router-dom";


export default function Card({name, flag, continent, id}){

    // function consologueando(){
    //     console.log('name:', name)
    //     console.log('image:', image)
    //     console.log('temperaments:', temperaments)
    //     console.log('weight:', weightMax)
    //     console.log('weight:', weightMin)
    //     console.log('id:', id) 
    // }

    // const tempSplit =()=> temperaments.split(",");
    // consologueando();
    // const dogsDetail = useSelector(state => state.dogsDetail);
    // const dispatch = useDispatch();
    


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