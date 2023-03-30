import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, createNewActivity, createNewActivity22, create_dog, getAllActivities, getAllCountries, getTemperaments } from "../../Redux/Actions/actions";
import './CreateActivity.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import styles from './CreateActivity.module.css'; 


export default function CreateActivity () {
    const dispatch = useDispatch();
    const allActivities = useSelector((state) => state.allActivities)
    // const countries = useSelector((state) => state.countries);
    const allCountries = useSelector((state) => state.allCountries);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);
    
    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countries:""
    });

    // console.log(allCountries)

    function validate (input) {
        let errors = {};
        
        if(!input.name) {
            errors.name = "*Activity name required*";
        }

        if(input.name.length < 3 || input.name.length > 15) {
            errors.name = "*Invalid activity name*";
        }

        if(!input.duration) {
            errors.duration = "*Duration time required*";
        }

        if(!input.season) {
            errors.season = "*Please select a season*";
        }

        if(input.countries.length === 0) {
            errors.countries = "*Please select a country*";
        }

        if(!input.difficulty) {
            errors.difficulty = "*Please select a difficulty*";
        }

        if (Object.entries(errors).length === 0) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }

        return errors
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCountrySelect(e) {
        if (input.countries.includes(e.target.value)) {
            e.target.value = 'default';
            return alert("You've already selected that country")
        } else {
        setInput({
            ...input,
            countries:[...input.countries, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))        
        }
        e.target.value = 'default';
    }

    function handleSelect(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        let validateName = allActivities?.find(a => a.name === (input.name))
        if(validateName !== undefined) {
            alert("Activity by that name already exists!")
        } else {
            dispatch(createNewActivity(input))
            alert("Activity created!!")
            setInput({
                name:"",
                difficulty:"",
                duration:"",
                season:"",
                countries:""
            })
            history.push('/countries')    
            console.log(input)
            console.log(setInput)        
        }        
    }

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities())
        }, [dispatch]);

    return (
        <div className = {styles.createActivityGrid}>
            {/* <div className = {styles.navBarCreate}>    
                <NavBar />
            </div> */}
            <div className = {styles.contentCreate}>            
                <h1>Create your Activity!</h1>
                <br></br>
                <form onSubmit = {e => handleSubmit(e)}>
                    <div>
                        <label>Activity: </label>
                        <input
                        type = "text"
                        value = {input.name}
                        name = "name"
                        onChange = {handleChange}
                        className={styles.inputText}
                        />
                        {errors.name && (
                            <p className = "p">{errors.name}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Difficulty: </label>
                        <select defaultValue = {'default'} name = "difficulty" onChange = {e => handleSelect(e)}>
                            <option value ='default' disabled>Difficulty</option>
                            <option value ="1">1</option>
                            <option value ="2">2</option>
                            <option value ="3">3</option>
                            <option value ="4">4</option>
                            <option value ="5">5</option>
                        </select>
                    </div>
                    <div>
                    {errors.difficulty && (
                        <p className = "p">{errors.difficulty}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <label>Duration: </label>
                        <input
                        type = "text"
                        value = {input.duration}
                        name = "duration"
                        onChange = {handleChange}
                        className={styles.inputText}
                        />
                        {errors.duration && (
                            <p className = "p">{errors.duration}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Season: </label>
                        <select defaultValue = {'default'} name = "season" onChange = {e => handleSelect(e)}>
                            <option value='default' disabled>Season</option>                            
                            <option value="Autumn">Autumn</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>
                    <div>
                    {errors.season && (
                        <p className = "p">{errors.season}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                    <select defaultValue = {'default'} name = "relatedCountries" onChange = {e => handleCountrySelect(e)}>
                            <option value = 'default' disabled>Select Country</option>
                                {allCountries?.map(c => (
                                    <option key = {c.name} value = {c.name}>{c.name}</option>
                                ))}                    
                        </select>
                        {errors.countries && (
                                <p className = "p">{errors.countries}</p>
                            )}
                    </div>
                    <br></br>
                    <button className = {styles.botonCreate} type ='submit' disabled = {!buttonEnabled}>Create</button>
                </form>
                <br></br>
            </div>
            <br></br>
                <NavLink to = '/countries' className={styles.botonback}>
                    <button>Back to Home</button>
                </NavLink>            
        </div>
    )
}

// const CreateActivity = () =>{


//     const allCountries = useSelector(state => state.allCountries)

//     const [input, setInput] = useState({
//         name:"",
//         difficulty:"",
//         duration:"",
//         season:"",
//         countries:[],
// })

//     const [errors, setErrors] = useState({});
    
//     const dispatch = useDispatch();

//     useEffect(()=>{
//         dispatch(getAllCountries());
//     },[])

// function handleOnSubmit(event){
//     event.preventDefault()
//     // if(!Object.keys(errors).length){
//         dispatch(createNewActivity(input));
//         setInput({
//             name:"",
//             difficulty:"",
//             duration:"",
//             season:"",
//             countries:[],
//         });    
//         console.log("input:",input)

//     // } else {
//         // alert("Debes llenar bien el formulario")
//     // }
//     }

//     const handleChange = (event) =>{
//         setInput({
//             ...input,
//             [event.target.name]: event.target.value
//         })
//     }

    
//         function handleCountrySelect(e) {
//             if (input.countries.includes(e.target.value)) {
//                 e.target.value = 'default';
//                 return alert("You've already selected that country")
//             } else {
//             setInput({
//                 ...input,
//                 countries:[...input.countries, e.target.value]
//             })   
//             }
//             e.target.value = 'default';
//         }


//     const validateInput = (input) => {
//         const errors = {};
//         if(!input.name.length) errors.name= "Debe ingresar un nombre";
//         if(!input.difficulty.length) errors.difficulty=  "Debe ingresar una dificultad";
//         if(!input.duration.length) errors.duration=  "Debe ingresar una duracion";
//         if(!input.season.length) errors.season=  "Debe ingresar una temporada";
//         if(!input.countries.length) errors.countries=  "Debe ingresar un pais en donde se realize la actividad";
//         return errors;
//     }

//     useEffect(()=>{
//         setErrors(validateInput(input))
//     },[input])

//     return(
//         <div className="conteinerCreateDog" >
//             <h3>FORMULARIO PARA CREAR UNA NUEVA ACTIVIDAD</h3>
//             <Link to={`/countries`}>
//             <button className="boton-back">BACK TO HOME</button>
//             </Link>
//             <form onSubmit={e => handleOnSubmit(e)}>
//                 <div>
//                     <label>Name:</label>
//                     <input placeholder="Type any name" type="text" name="name" value={input.name} onChange={handleChange} />
//                     <p>{errors.name && errors.name}</p>
//                 </div>
//                 <div>
//                     <label>Difficulty:</label>
//                     <input placeholder="difficulty" type="number" name="difficulty" value={input.difficulty} onChange={handleChange} />
//                     <p>{errors.difficulty && errors.difficulty}</p>
//                 </div>
//                 <div>
//                     <label>Duration:</label>
//                     <input placeholder="duration" type="number" name="duration" value={input.duration} onChange={handleChange} />
//                     <p>{errors.duration && errors.duration}</p>
//                 </div>
//                 <div>
//                     <label>Season:</label>
//                     <input placeholder="season" type="text" name="season" value={input.season} onChange={handleChange} />
//                     <p>{errors.season && errors.season}</p>
//                 </div>
//                 <div>
//                     <label>Countries:</label>
//                     {/* <input placeholder="countries..." type="text" name="countries" value={input.countries} onChange={handleCountrySelect} /> */}

//                 <select multiple name="countries" value={input.countries} onChange={handleCountrySelect} >
//                     <option value="default">Select Country</option>
//                     {
//                         allCountries?.map((c)=>{
//                             return(
//                             <option key={c.name} value={c.name}>{c.name}</option>
//                             )
//                         })
//                     }
//                 </select>

//                     <p>{errors.countries && errors.countries}</p>
//                 </div>
//                 <button className="botonCreate" onClick={handleOnSubmit}>CREATE ACTIVITY</button>

//             </form>
//             {/* <button>CREATE DOG</button> */}
//         </div>
//     )
// }
// export default CreateActivity;