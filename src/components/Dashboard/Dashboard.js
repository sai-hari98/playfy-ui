import React, { Component } from "react";
import playfyAxios from "../../playfy-axios";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Dashboard extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    state = {
        dashboardData: null
    }

    componentDidMount() {
        console.log('Dashboard mounted');
    }

    getToken() {
        const { cookies } = this.props;
        console.log(this.props);
        console.log(cookies);
        console.log(cookies.get('token'));
        return cookies.get('token');
    }

    getDashboardInfo() {
        playfyAxios.get("/dashboard", { headers: { Authorization: `Bearer ${this.getToken()}` } }).then(response => {
            this.setState({ dashboardData: response.data });
        }).catch(error => {
            console.log(error);
            alert("An error occurred while loading the page");
        });
    }

    getLinkAccountsBanner() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row d-flex justify-content-between">
                                <div className="col-6">
                                    No accounts are linked currently. Want to link one?
                                </div>
                                <div className="col-2">
                                    <Link className="card-link" to="/linked-accounts">Link an account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getRenderedPlaylists() {
        return (
            <div className="row">
                {this.state.dashboardData.playlists.map(playlist => {
                    return (
                        <div className="col-4">
                            <div className="card">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{playlist.title}</h5>
                                    <a href="#" className="card-link material-symbols-outlined">sync</a>
                                    <a href="#" className="card-link material-symbols-outlined">download</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        if (this.state.dashboardData == null) {
            this.getDashboardInfo();
            return <Loader />;
        }
        if (this.state.dashboardData.linkedAccounts.length <= 0) {
            return (
                <div className="container-fluid mt-5 pb-5">
                    this.getLinkAccountsBanner();
                </div>
            )
        } else {
            return (
                <div className="container-fluid mt-5 pb-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row d-flex justify-content-between">
                                <div className="col-2">
                                    <h5>
                                        Dashboard
                                    </h5>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-primary">Sync Playlists</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.getRenderedPlaylists()}
                </div>
            )
        }
    }
}

export default withCookies(Dashboard);