import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Colors from '../../styles/Colors'

const White = Colors.White;
const Indigo = Colors.Indigo;

interface employeeTypes {
    id?: number;
    name: string;
    age: number;
    country: string;
    position: string;
    wage: number;
}

const Home = () => {

    const [employeeList, setEmployeeList] = useState<employeeTypes[]>([]);

    useEffect(() => {
        Axios.get('http://localhost:5000/read')
        .then((res) => setEmployeeList(res.data));
    }, [])

    return (
        <div>
            {employeeList.map((val, key : number ) => {
                return (
                    <div>
                        <Paper elevation={2} style={{ padding: '10px' }} >
                            <Link to={`/team/${val.id}`} style={{ textDecoration: 'none' }}>
                                <h3 style={{ display: 'none' }}>{key}</h3>
                                <Typography style={{ color: Indigo }}>Country: {val.country}</Typography>
                            </Link>
                        </Paper>
                        <br/>
                    </div>

                )
            })}
        </div>
    )
}

export default Home
