import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class index extends Component {
	state = {
		list: []
	}

	componentDidMount() {
		const par = JSON.parse(sessionStorage.getItem('songPage'))
		const { dispatch } = this.props
		if(par) {
			const { type, payload } = par
			dispatch({
				type,
				payload
			})
			.then((res)=>{
				if(res.code == 200) {
					this.setState({
						list: res.playlist.tracks
					})
				}
			})
		}
		
	}

	songBack = () => {
		const { dispatch } = this.props;
		dispatch(routerRedux.goBack())
	}


	render() {

		const { list } = this.state

		return (
			<div className="index">

				<div className="songTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div>

				<div className="songBody">
					{
						list.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">{item.ar.map((item, index) => { return ` ${item.name} ` })}</div>
								<img className="songPlay" src={play} />
							</div>
						})
					}
				</div>

				<div className="footer">
					<div className="footer_img"></div>
					<div className="footer_text">The Show</div>
					<div className="footer_text2">The ShowThe ShowThe ShowThe Show</div>

					{/* <img className="footer_play" src={stop} /> */}
					<img className="footer_play" src={play} />
					<img onClick={this.handleMenu} className="footer_menu" src={musicMenu} />
				</div>

			</div>
		);
	}
}

export default index;