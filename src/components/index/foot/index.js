import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';

import { menu, search, play, stop, musicMenu } from '../../../assets/asset'

@connect(({ index }) => ({
	index
}))
class foot extends Component {
	state = {
		menuTop: '100%',
	}

	componentDidMount() {
		// setInterval(()=>{
		// 	this.getPlayTime()
		// }, 500)
		this.getPlayTime()
		// this.play()
	}

	componentWillReceiveProps() {
		this.play()
	}

	getPlayTime = () => {
		let player = document.getElementById('player')
		const { dispatch } = this.props;
		setInterval(()=>{
			let time = Math.floor(player.currentTime)
			let sec = time % 60;
			let min = (time - sec) / 60;
			if(sec - (sec % 10) === 0) {
				sec = '0' + sec
			}
			if(min - (min % 10) === 0) {
				min = '0' + min
			}
			let payload = {
				time: `${min}:${sec}`,
				min,
				sec
			}
			// dispatch({
			// 	type: 'index/setTime',
			// 	payload
			// })
		}, 500)
	}

	musicPlay = (isPause) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/setPause',
			isPause
		})
	}
    
	handleMenu = () => {
		this.setState({
			menuTop: '0'
		})
	}

	handleMenuBack = () => {
		this.setState({
			menuTop: '100%'
		})
	}

	play = () => {
		const { music: { isPause } } = this.props.index
		console.log('isPause',isPause)
		let player = document.getElementById('player')
		if(isPause) {
			player.pause()
		}
		else {
			setTimeout(()=>{
				player.play()
			}, 500)
		}
	}

	render() {
		const { menuTop } = this.state;
		const { music: { src, isPause, picUrl, name, ar } } = this.props.index

		return (
			<div className="foot_index">

				<audio id="player" src={src} />
				
				<div className="footer">

					<img src={picUrl} className="footer_img" />
					<div className="footer_text">{name}</div>
					<div className="footer_text2">{ar}</div>

					{
						isPause ? <img className="footer_play" src={play} onClick={() =>this.musicPlay(false)} /> : <img className="footer_play" src={stop} onClick={() => this.musicPlay(true)} />
					}
					
					<img onClick={this.handleMenu} className="footer_menu" src={musicMenu} />
				</div>

				<div className="musicMenu" style={{ top: menuTop }}>
					<div className="musicMenu_back" onClick={this.handleMenuBack}></div>
					<div className="musicMenu_content"></div>
				</div>
			</div>
		);
	}
}

export default foot;