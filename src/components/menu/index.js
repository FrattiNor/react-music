import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, error, love, love_red, del, looper1, looper2, looper3 } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class menu extends Component {
	state = {
		list: [],
		loveList: [],
	}

	componentDidMount() {
		this.getList()
		this.getlove()
    }
    
    componentWillReceiveProps() {
		this.getList()
		this.getlove()
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

    getList = () => {
        const par = JSON.parse(localStorage.getItem('musicMenu')) || []
        this.setState({
            list: par
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
	
	musicPlay = (isPause) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/setPause',
			isPause
		})
	}

	delAll = () => {
		const { dispatch } = this.props;
        let a = []
		localStorage.setItem('musicMenu', JSON.stringify(a))
		dispatch({
			type: 'index/update'
		})
	}

	changeLooper = () => {
		const { looper } = this.props.index
		const { dispatch } = this.props
		let newLooper
		if(looper == 3) {
			newLooper = 1
		} else {
			newLooper = looper + 1
		}
		dispatch({
			type: 'index/setLooper',
			payload: {
				looper: newLooper
			}
		})
	}

	render() {

		const { list, loveList } = this.state
		const { music: { id, isPause }, looper } = this.props.index

		return (
			<div className="menu_index">

				<div className="songTop2">
					<img onClick={this.songBack} className="songLooper" src={looper == 1 ? looper1 : ( looper == 2 ? looper2 : looper3 )} onClick={this.changeLooper} />
					<div className="looper_text">{looper == 1 ? '循环播放' : ( looper == 2 ? '单曲循环' : '随机播放' )}</div>
					<img onClick={this.songBack} className="songDelete" src={del} onClick={this.delAll} />
				</div>

				<div className="songBody2">
					{/* {
						list.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}</div>
								<img src={loveList.indexOf(item.id) == -1 ? love : love_red} onClick={loveList.indexOf(item.id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="songLove" />
								<img onClick={ () => this.delMusic(item) } className="songDel" src={error} />
								{
									id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
								}
							</div>
						})
					} */}
					{
						list.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">
									{item.song && item.song.artists.map((item, index) => { return ` ${item.name} ` })}
									{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}
								</div>
								<img src={loveList.indexOf(item.id) == -1 ? love : love_red} onClick={loveList.indexOf(item.id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="songLove" />
								<img onClick={ () => this.delMusic(item) } className="songAdd" src={error} />
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

export default menu;