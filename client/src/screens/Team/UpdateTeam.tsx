import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function CreateTeam({ match } : any) {

    const email = JSON.parse(window.localStorage.getItem("userEmail") || "{}");  
    const getId = match.params.id;
    const id = `${getId}`;

    const [age, setAge] = React.useState<number>(0);
    const [country, setCountry] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [wage, setWage] = useState<number>(0);

    useEffect(() => {
        Axios.get(`http://localhost:5000/readOne/${id}`)
        .then((res) => 
            (
                setAge(res.data[0].age),
                setCountry(res.data[0].country),
                setPosition(res.data[0].position),
                setWage(res.data[0].wage)
            )
        );
    }, [])

    const updateEmployee = () => {
        Axios.put(`http://localhost:5000/update/${id}`, { age, country, position, wage })
        window.location.replace("/");   
    }

    return (
        <div className="App">
            <div className="information">
                <div>{email} + 니 이1메일임.Update+{age}</div>
                <label>Name</label>
                <input 
                    type="text"
                    value={email}
                    readOnly
                />
                <label>Age</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setAge(parseInt(e.target.value));
                    }}
                    value={age}
                />
                <label>Country:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setCountry(e.target.value);
                    }}
                    value={country}
                />
                <label>Position:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setPosition(e.target.value);
                    }}
                    value={position}
                />
                <label>Wage (year):</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setWage(parseInt(e.target.value));
                    }}
                    value={wage}
                />
            </div>
            <button onClick={updateEmployee}>Update Employee</button>
        </div>
    )
}