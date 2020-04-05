import React from 'react'
import './form.css'

const Weather = (props) => {
    return (
        <div className="container text-light">
           <div className="cards pt-4">
                <h1>{props.city}{/* ,{props.country} */}</h1>
               <h5 className="py-4">
                   <i className={`wi ${props.weathericon} display-1`}></i>
               </h5>
               {props.temp_celsius ? <h1 className="py-2">{props.temp_celsius}&deg;</h1> : null}
               {
                minmaxTemp(props.temp_min, props.temp_max)
               }
               <h4 className="py-3">{props.description}</h4>
               
           </div>
        </div>
    )
}

// buat dapetin suhu minimal dan maksimal
const minmaxTemp = (min, max) => {
    if (min && max) {
        return (
            <div>
                <h4>
                    <span className="px-4">min</span>
                    <span className="px-4">max</span>
                </h4>
                <h3>
                    <span className="px-4">{min}&deg;</span>
                    <span className="px-4">{max}&deg;</span>
                </h3>
            </div>
        )
    }
}

export default Weather