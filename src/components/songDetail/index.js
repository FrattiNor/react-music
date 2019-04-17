import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Menu from '../menu'

import { play, stop, musicMenu, back, music_back, music_up, love, love_red } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class song extends Component {
	state = {
		list: [],
		menuTop: '100%',
	}

	componentDidMount() {
		
	}

	songBack = () => {
		const { dispatch } = this.props;
		dispatch(routerRedux.goBack())
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

	musicPlay = (isPause) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/setPause',
			isPause
		})
	}

	changeMusic = (item) => {
        const { dispatch } = this.props;
		let ar = '';
		let picUrl;
		if(item.ar) {
			item.ar.forEach((item, index) => {
				ar += item.name + ' '
			})
			picUrl= item.al.picUrl
		} else {
			item.song.artists.forEach((item, index) => {
				ar += item.name + ' '
			})
			picUrl= item.song.album.blurPicUrl
		}
		
		let payload = {
			id: item.id,
			name: item.name,
			picUrl: picUrl,
			ar: ar,
			src: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
		}
		dispatch({
			type: 'index/setMusic',
			payload
		})
	}

	musicUp = (id) => {
		let a = JSON.parse(localStorage.getItem('musicMenu'))
		let theIndex = -1
		a.forEach((item, index) => {
			if(id == item.id) {
				theIndex = index
			}
		})
		if(theIndex == a.length - 1) {
			theIndex = -1
		}
		let next = a[theIndex + 1]
		this.changeMusic(next)
	}

	musicBack = (id) => {
		let a = JSON.parse(localStorage.getItem('musicMenu'))
		let theIndex = -1
		a.forEach((item, index) => {
			if(id == item.id) {
				theIndex = index
			}
		})
		if(theIndex == 0){
			theIndex = a.length
		}
		if(theIndex == -1) {
			theIndex = 1
		}
		let next = a[theIndex - 1]
		this.changeMusic(next)
	}

	render() {

		const { menuTop } = this.state
		const { music: { isPause, picUrl, ar, name, id } } = this.props.index

		return (
			<div className="songDetail_index">
				{/* <div className="cover_bt" onClick={this.handleMenu}></div> */}

				<div className="theTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div>
				
				<div className="theContent">
					<div className="theContent_cover"></div>
					<img src={picUrl} className="theContent_img" />
					<div className="theContent_name">{name}</div>
					<div className="theContent_ar">{ar}</div>
				</div>
				
				<div className="theFooter">
					{
						isPause ? <img className="theFooter_play" src={play} onClick={() =>this.musicPlay(false)} /> : <img className="theFooter_play" src={stop} onClick={() => this.musicPlay(true)} />
					}
					<img src={love} className="theFooter_looper" />
					<img src={music_back} className="theFooter_back" onClick={ () => this.musicBack(id) } />
					<img src={music_up} className="theFooter_up" onClick={ () => this.musicUp(id) } />
					<img className="theFooter_menu" onClick={this.handleMenu} src={musicMenu} />
				</div>

				<div className="musicMenu" style={{ top: menuTop }}>
					<div className="musicMenu_back" onClick={this.handleMenuBack}></div>
					<div className="musicMenu_content"><Menu /></div>
				</div>
				
			</div>
		);
	}
}

export default song;