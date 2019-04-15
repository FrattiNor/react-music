import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back } from '../../assets/asset'

import Song from '../song'
import Singer from '../singer'
import SongList from '../songList'

@connect(({ index }) => ({
    index
}))
class theBack extends Component {
	state = {
		pathname: ''
	}

	componentDidMount() {
        let pathname = this.props.location.pathname;
        this.setState({
            pathname
        })
	}

	songBack = () => {
		const { dispatch } = this.props;
		dispatch(routerRedux.goBack())
	}

	componentwillunmount() {

	}

	render() {
        const { pathname } = this.state
		return (
			<div className="index">

				<div className="songTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div>
				
				{
                    pathname === '/song' ? <Song /> : ( pathname === '/singer' ? <Singer /> : <SongList /> )
                }

			</div>
		);
	}
}

export default theBack;