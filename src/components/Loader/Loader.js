import React, { Component } from 'react';

class Loader extends Component {

    render() {
        return (
            <div className="container-fluid mt-5 pt-5">
                <h5 className="text-center">Please wait while we fetch your information...</h5>
            </div>
        );
    }
}

export default Loader;