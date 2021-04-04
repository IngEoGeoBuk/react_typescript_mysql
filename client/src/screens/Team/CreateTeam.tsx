import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import UserInfoContext from '../../context/UserInfoContext';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

interface employeeTypes {
    id?: number;
    email: string;
    age: number;
    country: string;
    position: string;
    wage: number;
}

// ? 표시로 인해 해당값이 없을수도있다 라는 의미를 부여함
// !로 인해 해당값은 무조건 존재한다라는 의미를 부여람

// 밑에 val.id! 한 것 처럼
// 로컬스토레이지에서 아이디 비번 뽑아올떄도 뒤에 ! 붙여보자

export default function CreateTeam() {

    const getEmail = JSON.parse(window.localStorage.getItem("userEmail") || "{}");
    console.log(getEmail);
    const [email, setEmail] = React.useState<string>(getEmail);  
    const [age, setAge] = React.useState<number>(0);
    const [country, setCountry] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [wage, setWage] = useState<number>(0);

    const [employeeList, setEmployeeList] = useState<employeeTypes[]>([]);

    const addEmployee = () => {
        Axios.post('http://localhost:5000/create', {
            email, age, country, position, wage
        }).then(() => {
            setEmployeeList([
                ...employeeList,
                {email, age, country, position, wage},
            ])
        })
        window.location.replace("/");
    }

    useEffect(() => {
        Axios.get('http://localhost:5000/read')
        .then((res) => setEmployeeList(res.data));
    }, [])

    return (
        <div className="App">
            <div className="information">
                <div>{getEmail} + 니 이1메일임</div>
                <label>Email</label>
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
                />
                <label>Country:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setCountry(e.target.value);
                }}
                />
                <label>Position:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setPosition(e.target.value);
                    }}
                />
                <label>Wage (year):</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setWage(parseInt(e.target.value));
                    }}
                />
                <button onClick={addEmployee}>Add Employee</button>
            </div>
        </div>
    )
}
