import React, { useState } from 'react';
import playfyAxios from '../../playfy-axios';
import { logIn } from '../../store/actions';
import { createInputObject } from '../../utils/object-utils';
import { validateField } from '../../utils/validation-utils';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isNullOrEmpty } from '../../utils/string-utils';

const Login = (props) => {

    const [state, changeState] = useState({
        username: createInputObject(),
        password: createInputObject()
    })

    const navigate = useNavigate();

    const isFormValid = () => {
        const formAttributes = Object.keys(state);
        for(let i = 0 ; i < formAttributes.length ; i++){
            if(!state[formAttributes[i]].valid)
                return false;
        }
        return true;
    }

    const updateUsername = (newUserId) => {
        let stateCopy = {...state};
        let username = {...stateCopy.username}
        username.value = newUserId;
        username.valid = validateField(username);
        stateCopy.username = username;
        changeState(stateCopy);
    }

    const updatePassword = (newPassword) => {
        let stateCopy = {...state};
        let password = {...stateCopy.password}
        password.value = newPassword;
        password.valid = validateField(password);
        stateCopy.password = password;
        changeState(stateCopy);
    }

    const login = () => {
        playfyAxios.post("/auth/login",{"userId" : state.username.value, "password" : btoa(state.password.value)},{withCredentials: true}).then(response => {
            alert("Login Successful! Redirecting to dashboard...");
            // window.location.href = "./dashboard";
            navigate("/dashboard");
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-4">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="user-id">User Id</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="user-id" value={state.username.value} onChange={(event) => updateUsername(event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="pwd">Password</label>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" id="pwd" value={state.password.value} onChange={(event) => updatePassword(event.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary" disabled={!isFormValid()} onClick={() => login()}>Login</button>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 d-flex justify-content-end">
                                    <a href="/register" className="card-link">Not Registered?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token : state.token
    }
}

const mapActionsToProps = dispatch => {
    return {
        login : (token) => dispatch(logIn(token))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);