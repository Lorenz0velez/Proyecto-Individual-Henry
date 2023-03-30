// import React from 'react';
// import './Pagination.css'

// export default function Pagination({allCountries, countriesPerPage, pagination}){

//     const numberPage = [];

//     for(let i  = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){
//         numberPage.push(i)
//     }

//     return(
//         <nav>
//             <ul className='paginationBar'>
//                 {
//                     numberPage &&
//                     numberPage.map((number)=>{
//                         return(
//                             <li key={number} className='paginationNumber'>
//                                 <button onClick={()=> pagination(number)} >
//                                     {number}
//                                 </button>
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//         </nav>
//     )
// }
import React, { useState } from 'react';
import './Pagination.css'

export default function Pagination({allCountries, countriesPerPage, pagination}){

    const [currentPage, setCurrentPage] = useState(1);
    const numberPage = [];

    for(let i  = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){
        numberPage.push(i)
    }

    return(
        <nav>
            <ul className='paginationBar'>
                {
                    numberPage &&
                    numberPage.map((number)=>{
                        return(
                            <li key={number} className={`paginationNumber ${currentPage === number ? 'current-page' : ''}`}>
                                <button onClick={()=> {
                                    setCurrentPage(number)
                                    pagination(number)
                                }} >
                                    {number}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
