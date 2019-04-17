import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, add } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class song extends Component {
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
						list: res.songs || res.playlist.tracks
					})
				}
			})
		}
	}

	songBack = () => {
		const { dispatch } = this.props;
		dispatch(routerRedux.goBack())
	}

	changeMusic = (item) => {
        const { dispatch } = this.props;
        let ar = ''
        item.ar.forEach((item, index) => {
            ar += item.name + ' '
        })
		let payload = {
			id: item.id,
			name: item.name,
			picUrl: item.al.picUrl,
			ar: ar,
			src: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
		}
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

	render() {

		const { list } = this.state
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
								<img onClick={ () => this.addMusic(item) } className="songAdd" src={add} />
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