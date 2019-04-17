import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, add, love, love_red } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class mine extends Component {
	state = {
		history: [],
		loveList: [],
		loveList2: []
	}

	componentDidMount() {
		this.getloveAndHistory()
	}

	componentWillReceiveProps() {
		this.getloveAndHistory()
	}

	getloveAndHistory = () => {
		let a = JSON.parse(localStorage.getItem('history')) || [];
		let b = JSON.parse(localStorage.getItem('love')) || [];
		let c = []
		b.forEach((item)=>{
			c.push(item.id)
		})
		this.setState({
			history: a,
			loveList: c,
			loveList2: b.slice(0,10)
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

	pushSong = () => {
		sessionStorage.setItem('songPage', JSON.stringify({ payload: 'love' }))
		const { dispatch } = this.props;
		dispatch(routerRedux.push('/song'))
	}

	render() {
		const { history, loveList, loveList2 } = this.state
		const { music: { id, isPause } } = this.props.index

		return (
			<div style={{fontSize: '30px'}}>
				<div className="recommend">
					<div className="recommend_title">历史记录</div>
					{
						history.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">
									{item.song && item.song.artists.map((item, index) => { return ` ${item.name} ` })}
									{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}
								</div>
								<img src={loveList.indexOf(item.id) == -1 ? love : love_red} onClick={loveList.indexOf(item.id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="songLove" />
								<img src={add} onClick={ () => this.addMusic(item) } className="songAdd" />
								{
									id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
								}
							</div>
						})
					}
				</div>

				<div className="recommend">
					<div className="recommend_title" onClick={this.pushSong} >歌曲收藏</div>
					{
						loveList2.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">
									{item.song && item.song.artists.map((item, index) => { return ` ${item.name} ` })}
									{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}
								</div>
								<img src={loveList.indexOf(item.id) == -1 ? love : love_red} onClick={loveList.indexOf(item.id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="songLove" />
								<img src={add} onClick={ () => this.addMusic(item) } className="songAdd" />
								{
									id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
								}
							</div>
						})
					}
				</div>

				<div className="recommend">
					<div className="recommend_title">歌单收藏</div>
				</div>

			</div>
		);
	}
}

export default mine;