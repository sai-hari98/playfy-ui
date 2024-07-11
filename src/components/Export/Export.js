import React, { Component } from 'react';

class Export extends Component {

    state = {
        playlistName : '',
        isPlaylistNameTextboxValid : false
    }

    onChangePlaylistName = (newName) => {
        let state = {...this.state};
        state.isPlaylistNameTextboxValid = !(newName === null || newName === undefined || newName === '');
        state.playlistName = newName;
        this.setState(state);
    }

    render() {
        return (
            <>
                <h4 className='pt-2'>Export Playlist</h4>
                <div className='row mt-2'>
                    <div className="col-3 text-bold">
                        Enter Playlist name to export
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12">
                                <input type='text' className='form-control' value={this.state.playlistName} onChange={(event) => this.onChangePlaylistName(event.target.value)}/>
                            </div>
                            <div className="col-12">
                                <button className='btn btn-primary mt-2' disabled={!this.state.isPlaylistNameTextboxValid}>Export</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">

                    </div>
                </div>
            </>
        )
    }
}

export default Export;