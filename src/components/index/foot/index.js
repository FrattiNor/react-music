import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import Menu from '../../menu'

import { menu, search, play, stop, musicMenu } from '../../../assets/asset'

@connect(({ index }) => ({
	index
}))
class foot extends Component {
	state = {
		menuTop: '100%',
	}

	componentDidMount() {	
		// this.getPlayTime()
		setInterval(this.musicEnd, 1000)
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
			dispatch({
				type: 'index/setTime',
				payload
			})
		}, 10)
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

	pushSongDetail = () => {
		const { dispatch } = this.props;
		let a = JSON.parse(sessionStorage.getItem('title')) || []
		a.push({ name: '歌曲详情', type: '歌曲详情' })
		sessionStorage.setItem('title', JSON.stringify(a))
		dispatch(routerRedux.push('/songDetail')) 
	}

	musicEnd = () => {
		let player = document.getElementById('player')
		console.log(player.ended)
		const { music: { id }, looper } = this.props.index
		if(player.ended) {
			looper == 1 ? this.musicUp(id) : ( looper == 2 ? this.musicJustOne() : this.musicRandom(id) )
		}
	}

	musicUp = (id) => {
		let a = JSON.parse(localStorage.getItem('musicMenu')) || []
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
		if(next) {
			this.changeMusic(next)
		}
		
		// this.setState({
		// 	deg: 0
		// })
	}

	musicRandom = (id) => {
		let a = JSON.parse(localStorage.getItem('musicMenu')) || []
		let theIndex = -1
		a.forEach((item, index) => {
			if(id == item.id) {
				theIndex = index
			}
		})
		let next = theIndex
		while(theIndex == next) {
			next = Math.floor(Math.random()* a.length);
			console.log('next',next)
		}
		next = a[next]
		if(next) {
			this.changeMusic(next)
		}
	}

	musicJustOne = () => {
		let player = document.getElementById('player')
		player.currentTime = 0;
		player.play()
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
		localStorage.setItem('history',JSON.stringify(b))
		dispatch({
			type: 'index/setMusic',
			payload
		})
	}

	render() {
		const { menuTop } = this.state;
		const { music: { src, isPause, picUrl, name, ar } } = this.props.index

		return (
			<div className="foot_index">

				<audio id="player" src={src} />
				
				<div className="footer">

					<img src={picUrl} className="footer_img" onClick={this.pushSongDetail} />
					<div className="footer_text">{name}</div>
					<div className="footer_text2">{ar}</div>

					{
						isPause ? <img className="footer_play" src={play} onClick={() =>this.musicPlay(false)} /> : <img className="footer_play" src={stop} onClick={() => this.musicPlay(true)} />
					}
					
					<img onClick={this.handleMenu} className="footer_menu" src={musicMenu} />
				</div>

				<div className="musicMenu" style={{ top: menuTop }}>
					<div className="musicMenu_back" onClick={this.handleMenuBack}></div>
					<div className="musicMenu_content">
						<Menu />
					</div>
				</div>
			</div>
		);
	}
}

export default foot;
