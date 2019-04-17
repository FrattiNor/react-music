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
		loveList: [],
		item: ''
	}

	componentDidMount() {
		this.getlove()
		this.makeItem()
	}

	componentWillReceiveProps() {
		this.getlove()
		this.makeItem()
	}

	makeItem = () => {
		const { music: { isPause, picUrl, ar, name, id } } = this.props.index
		let item = {
			id,
			name,
			ar: [{
				name: ar
			}],
			al: {
				picUrl: picUrl
			}
		}
		this.setState({
			item
		})
	}
	
	getlove = () => {
		let b = JSON.parse(localStorage.getItem('love')) || [];
		let c = []
		b.forEach((item)=>{
			c.push(item.id)
		})
		this.setState({
			loveList: c,
		})
	}

	loveMusic = (item, love) => {
		const { dispatch } = this.props;

		let b = JSON.parse(localStorage.getItem('love')) || [];
		let c = b.filter((item2)=>{
			return item.id != item2.id
		})
		if(love) {
			c.push(item);
		}
		localStorage.setItem('love', JSON.stringify(c))
		dispatch({
			type: 'index/update'
		})
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

		let a = JSON.parse(localStorage.getItem('history')) || []
		let b = a.filter((item2)=>{
            return item.id != item2.id
		})
		b.unshift(item)
		if(b.length >= 11) {
			b.shift()
		}
		console.log(b)
		localStorage.setItem('history',JSON.stringify(b))
		

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

		const { menuTop, loveList, item } = this.state
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
					<img src={loveList.indexOf(id) == -1 ? love : love_red} onClick={loveList.indexOf(id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="theFooter_love" />
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