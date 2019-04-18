import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, add, love, love_red, error } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class song extends Component {
	state = {
		list: [],
		loveList: [],
		menuList: []
	}

	componentDidMount() {
		this.getlove()
		this.getMenu()

		const par = JSON.parse(sessionStorage.getItem('songPage')) || []
		const { dispatch } = this.props
		if(par) {
			if(par.payload == 'love') {
				this.setState({
					list: JSON.parse(localStorage.getItem('love')) || []
				})
			} else {
				const { type, payload } = par
				dispatch({
					type,
					payload
				})
				.then((res)=>{
					if(res.code == 200) {
						this.setState({
							list: res.songs || res.playlist.tracks
						})
					}
				})
			}
		}
	}

	componentWillReceiveProps() {
		this.getlove()
		this.getMenu()
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

	getMenu = () => {
		let b = JSON.parse(localStorage.getItem('musicMenu')) || []
		let c = [];
		b.forEach((item)=>{
			c.push(item.id)
		})
		this.setState({
			menuList: c,
		})
	}

	songBack = () => {
		const { dispatch } = this.props;
		dispatch(routerRedux.goBack())
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


	musicPlay = (isPause) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/setPause',
			isPause
		})
	}

	addMusic = (item) => {
		const { dispatch } = this.props
		let a = JSON.parse(localStorage.getItem('musicMenu')) || []
		let b = true
		a.forEach((item2)=>{
			if(item2.id == item.id) {
				b = false;
			}
		})

		if(b) {
			a.push(item)
			localStorage.setItem('musicMenu', JSON.stringify(a))
			dispatch({
				type: 'index/update'
			})
		}
		
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

	delMusic = (item) => {
		const { dispatch } = this.props;
        const par = JSON.parse(localStorage.getItem('musicMenu')) || []
        let a = par.filter((item2)=>{
            return item.id != item2.id
        })
		localStorage.setItem('musicMenu', JSON.stringify(a))
		dispatch({
			type: 'index/update'
		})
	}

	render() {

		const { list, loveList, menuList } = this.state
		const { music: { id, isPause } } = this.props.index

		return (
			<div className="song_index">

				{/* <div className="songTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div> */}

				<div className="songBody">
					{
						list.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}</div>
								<img src={loveList.indexOf(item.id) == -1 ? love : love_red} onClick={loveList.indexOf(item.id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="songLove" />
								<img onClick={ menuList.indexOf(item.id) == -1 ? () => this.addMusic(item) : () => this.delMusic(item) } className="songAdd" src={menuList.indexOf(item.id) == -1 ? add : error} />
								{
									id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
								}
							</div>
						})
					}
				</div>

			</div>
		);
	}
}

export default song;