import React, { useState } from 'react';
import { createInputObject } from '../../utils/object-utils';
import { useNavigate } from 'react-router-dom';
import playfyAxios from '../../playfy-axios';
import { isNullOrEmpty } from '../../utils/string-utils';
import { validateField } from '../../utils/validation-utils';

const Register = (props) => {
    const [state, changeState] = useState({
        firstName : createInputObject({minChar : 1, maxChar: 100}),
        lastName : createInputObject({minChar : 1, maxChar: 100}),
        userId : createInputObject({minChar : 6, maxChar: 10}),
        email : createInputObject({email : true}),
        password : createInputObject({password: true}),
        confirmPassword : createInputObject({password: true})
    });
    const navigate = useNavigate();

    const isFormValid = () => {
        const formAttributes = Object.keys(state);
        for(let i = 0 ; i < formAttributes.length ; i++){
            if(!state[formAttributes[i]].valid)
                return false;
        }
        return true;
    }

    const updateField = (fieldName, value) => {
        let stateCopy = {...state};
        let field = {...stateCopy[fieldName]};
        field.value = value;
        field.valid = validateField(field);
        field.touched = !isNullOrEmpty(value);
        stateCopy[fieldName] = field;
        changeState(stateCopy);
    }

    const arePasswordsMatching = () => {
        if(!isNullOrEmpty(state.password.value) && !isNullOrEmpty(state.confirmPassword.value)){
            if(state.password.value !== state.confirmPassword.value)
                return false;
        }
        return true;
    }

    const register = () => {
        let registerRequest = {
            userId : state.userId.value,
            password : btoa(state.password.value),
            email : state.email.value,
            firstName : state.firstName.value,
            lastName : state.lastName.value
        }
        playfyAxios.post("/users", registerRequest).then(response => {
            if(response.data){
                alert("You have been registered successfully. Redirecting to login page...");
                navigate('/login');
            }
        }).catch(error => {
            console.log(error);
            alert("An error occurred, please try again");
        })
    }
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-6">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Register</h5>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="first-name">First Name</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="first-name" value={state.firstName.value} onChange={(event) => updateField('firstName',event.target.value)} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="last-name">Last Name</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="last-name" value={state.lastName.value} onChange={(event) => updateField('lastName',event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="email">E-mail</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="email" value={state.email.value} onChange={(event) => updateField('email',event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="user-id">User Id</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id="user-id" value={state.userId.value} onChange={(event) => updateField('userId',event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="pwd">Password</label>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" id="pwd" value={state.password.value} onChange={(event) => updateField('password',event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="confirm-pwd">Confirm Password</label>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" id="confirm-pwd" value={state.confirmPassword.value} onChange={(event) => updateField('confirmPassword',event.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary" disabled={!isFormValid() || !arePasswordsMatching()} onClick={() => register()}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;