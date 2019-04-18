import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, add, love, love_red, error } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class mine extends Component {
	state = {
		history: [],
		loveList: [],
		loveList2: [],
		songListLove2: [],
		songListLove: [],
		menuList: []
	}

	componentDidMount() {
		this.getloveAndHistory()
		this.getMenu()
	}

	componentWillReceiveProps() {
		this.getloveAndHistory()
		this.getMenu()
	}

	getloveAndHistory = () => {
		let a = JSON.parse(localStorage.getItem('history')) || [];
		let b = JSON.parse(localStorage.getItem('love')) || [];
		let d = JSON.parse(localStorage.getItem('songListLove')) || [];
		let c = []
		let e = []
		b.forEach((item)=>{
			c.push(item.id)
		})
		d.forEach((item)=>{
			e.push(item.id)
		})
		console.log(d)
		this.setState({
			history: a,
			loveList: c,
			loveList2: b.slice(0,10),
			songListLove: e,
			songListLove2: d
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
		let a = JSON.parse(sessionStorage.getItem('title')) || []
		a.push({ name: '歌曲收藏', type: '歌曲收藏' })
		sessionStorage.setItem('title', JSON.stringify(a))
		const { dispatch } = this.props;
		dispatch(routerRedux.push('/song'))
	}

	pushSong2 = (item) => {
		const { dispatch } = this.props;
		if(item.type == '专辑') {
			sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getAlbum', payload: item.id, item }))
		} else {
			sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getSongListDetail', payload: item.id, item }))
		}
		let a = JSON.parse(sessionStorage.getItem('title')) || []
		a.push({ name: item.name, type: 'list' })
		sessionStorage.setItem('title', JSON.stringify(a))
		dispatch(routerRedux.push('/song'));
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
		const { history, loveList, loveList2, songListLove, songListLove2, menuList } = this.state
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
								<img onClick={ menuList.indexOf(item.id) == -1 ? () => this.addMusic(item) : () => this.delMusic(item) } className="songAdd" src={menuList.indexOf(item.id) == -1 ? add : error} />
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
								<img onClick={ menuList.indexOf(item.id) == -1 ? () => this.addMusic(item) : () => this.delMusic(item) } className="songAdd" src={menuList.indexOf(item.id) == -1 ? add : error} />
								{
									id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
								}
							</div>
						})
					}
				</div>

				<div className="recommend2">
					<div className="recommend_title2">歌单&专辑收藏</div>
					{
						songListLove2.map((item, index)=>{
							return <div className="recommend_box2" key={index} onClick={() => this.pushSong2(item)}>
								<img className="recommend_img2" src={item.picUrl || item.coverImgUrl} />
								<div className="recommend_text2">{item.name}</div>
							</div>
						})
					}
				</div>

			</div>
		);
	}
}

export default mine;