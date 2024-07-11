import React, { useState } from 'react';
import { useEffect } from 'react';
import playfyAxios from '../../playfy-axios';
import { useCookies, withCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const SpotifyCallback = (props) => {

    const [state, changeState] = useState({accessCode: null, error: null, state: null, isLoading: true});
    useEffect(() => {
        processCallback();
    }, []);
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const processCallback = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessCode = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        if (error === null) {
            playfyAxios.post("/users/accounts/save", {token: accessCode, identifier: state}, {headers:{Authorization: `Bearer ${cookies.token})}`}})
            .then(response => {
                if(response.data){
                    navigate("/dashboard");
                    changeState({isLoading: false});
                }
            }).catch(error => {
                console.log(error);
                alert("An error occurred while linking the spotify account");
                changeState({isLoading: false, error: error});
            });
        }else{
            changeState({isLoading: false, error: error});
        }
    }

    if(state.isLoading){
        return (<Loader/>)
    }

    if (state.error !== null) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h5 className="text-center">
                            Sorry, we are unable to link the spotify account. Please give a try after sometime.
                        </h5>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h5 className="text-center">
                            Redirecting to dashboard page...
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(SpotifyCallback);