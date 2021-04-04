import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateComment from './CreateComment';
import moment from 'moment';
import 'moment/locale/ko';

import { Paper, OutlinedInput } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Colors from '../../styles/Colors'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const Black = Colors.Black;
const Indigo = Colors.Indigo;

interface employeeTypes {
    id?: number;
    email: string;
    age: number;
    country: string;
    position: string;
    wage: number;
}

interface CommentTypes {
    id? : number;
    poId? : number;
    email: string;
    context: string;
    time: Date;
}


const IconStyles = {
    color: Indigo, cursor: 'pointer', display: 'flex'
}


const DetailTeam = ({match} : any) => {
    const getId = match.params.id;
    const id = `${getId}`;
    const getEmail = window.localStorage.getItem("userEmail")?.substr(1).slice(0,-1);

    const [employeeList, setEmployeeList] = useState<employeeTypes[]>([]);
    const [commentList, setCommentList] = useState<CommentTypes[]>([]);
    const [targetComment, setTargetComment] = useState<number>();
    const [showUpdateComment, setShowUpdateComment] = useState<boolean>(false);

    const [newContext, setNewContext] = useState<string>('');
    const time = moment().format('YYYY-MM-DD:HH:mm:ss');

    const deleteEmployee = (id : number) => {
        Axios.delete(`http://localhost:5000/delete/${id}`).then((res) => {
        setEmployeeList(
            employeeList.filter((val) => {
                return val.id != id;
            })
            );
        });
        alert('글이 삭제 되었습니다.')
        window.location.replace("/");
    };

    useEffect(() => {
        Axios.get(`http://localhost:5000/readOne/${id}`)
        .then((res) => setEmployeeList(res.data));
        Axios.get(`http://localhost:5000/readComment/${id}`)
        .then((res) => setCommentList(res.data));
    }, [])

    const deleteComment = (id : number) => {
        Axios.delete(`http://localhost:5000/deleteComment/${id}`).then((res) => {
            setCommentList(
                commentList.filter((val) => {
                    return val.id != id;
                })
                );
            });
        window.location.reload();
    }

    const updateTargetCommentId = `${targetComment}`;
    const updateEmployee = () => {
        Axios.put(`http://localhost:5000/updateComment/${updateTargetCommentId}`, { newContext, time })
        window.location.reload(); 
    }

    
    return (
        <div>
            {employeeList.map((val, key : number ) => {
                return (
                    <div>
                        <Paper>
                            <h3 style={{ display: 'none' }}>{key}</h3>
                            <div style={{ display: 'flex', justifyContent : 'space-between' }}>
                                <h3>Email: {val.email}</h3>
                                {getEmail == val.email ? 
                                <div style={IconStyles}>
                                    <div style={{display: 'flex' }} onClick={() => { deleteEmployee(val.id!)}}>
                                        <DeleteIcon />
                                        <Typography>삭제</Typography>
                                    </div>
                                    <Link to={`/updateTeam/${val.id}`} style={{ display: 'flex', textDecoration: 'none' }}>
                                        <EditIcon style={{ color: Indigo }}/>
                                        <Typography style={{ color: Indigo }}>수정</Typography>
                                    </Link>
                                </div>
                                : <div></div>
                                }
                            </div>
                            <h3>Age: {val.age}</h3>
                            <h3>Country: {val.country}</h3>
                            <h3>Position: {val.position}</h3>
                            <h3>Wage: {val.wage}</h3>
                        </Paper>

                        <div>
                        {getEmail ?
                            <div>
                                <CreateComment 
                                    poId={val.id!} 
                                    email={getEmail}
                                /> 
                            </div>
                            : <div></div>
                        }
                        {commentList.map((val, key : number ) => {
                            return (
                                <div>
                                <Paper style={{ padding: '10px' }} elevation={2}>
                                    <div>
                                        <h3 style={{ display: 'none' }}>{key}</h3>
                                        <div style={{ display: 'flex', justifyContent : 'space-between' }}>
                                            <div>
                                            <Typography variant="h5" style={{ color: Indigo }}>user: {val.email}</Typography>
                                            </div>
                                            <div>
                                            {getEmail == val.email ? 
                                                <div style={IconStyles}>
                                                    <div style={{display: 'flex' }} onClick={() => deleteComment(val.id!)}>
                                                        <DeleteIcon />
                                                        <Typography>삭제</Typography>
                                                    </div>
                                                    <div style={{display: 'flex' }}
                                                        onClick={() => {
                                                        setTargetComment(val.id); 
                                                        setShowUpdateComment(!showUpdateComment);
                                                    }}>
                                                        <EditIcon/>   
                                                        <Typography>수정</Typography>
                                                    </div>
                                                </div> : <div></div>
                                                }
                                            </div>
                                        </div>
                                        <Typography>{val.context}</Typography>
                                        {val.id == targetComment && showUpdateComment ? 
                                            <div>
                                                <div>
                                                <OutlinedInput 
                                                    type="text"
                                                    style={{ width: '75%' }}
                                                    onChange={(e) => {
                                                        setNewContext(e.target.value);
                                                    }}
                                                />
                                                </div>
                                                <div>
                                                    <CheckIcon style={IconStyles}
                                                        onClick={() => {
                                                        updateEmployee()
                                                    }} />
                                                    <CloseIcon style={IconStyles}
                                                        onClick={() => {
                                                        setTargetComment(0); 
                                                        setShowUpdateComment(!showUpdateComment);
                                                    }} />
                                                </div> 
                                            </div>
                                            : <div></div> 
                                        }
                                        <Typography>{val.time}</Typography>
                                    </div>
                                </Paper>
                                <br/>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )
            })}
        </div> 
    )
}

export default DetailTeam