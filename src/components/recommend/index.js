import React, { Component } from 'react';
import './index.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import Slider from './slider';

import { play, stop, musicMenu, back, add } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class recommend extends Component {
	state = {
		song: [],
		dang: []
	}

	componentDidMount() {
		this.getSong()
		this.getDang()
	}

	getSong = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/getSong'
		})
		.then((res)=>{
			// console.log(res)
			this.setState({
				song: res.result
			})
		})
	}

	getDang = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/getDang'
		})
		.then((res)=>{
			// console.log(res)
			this.setState({
				dang: res.result
			})
		})
	}

	pushSong = () => {
		const { dispatch } = this.props;
		sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getRankSong', payload: 1 }))
		dispatch(routerRedux.push('/song'));
	}

	pushSongList = () => {
		const { dispatch } = this.props;
		sessionStorage.setItem('songListPage', JSON.stringify({ type: 'index/getSongList' }))
		dispatch(routerRedux.push('/songList'));
	}

	pushSinger = () => {
		const { dispatch } = this.props;
		sessionStorage.setItem('singerPage', JSON.stringify({ type: 'index/getHotSinger' }))
		dispatch(routerRedux.push('/singer'));
	}

	pushSong2 = (id) => {
		const { dispatch } = this.props;
		sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getSongListDetail', payload: id }))
		dispatch(routerRedux.push('/song'));
	}

	pushSingerDetail = (item) => {
		sessionStorage.setItem('singerDetail',JSON.stringify({name: item.name, id: item.id, pic: item.img1v1Url}))
		const { dispatch } = this.props;
		dispatch(routerRedux.push('/singerDetail'))
	}

	

	// getBase64 = (imgUrl) => {
	// 	window.URL = window.URL || window.webkitURL;
	// 	var xhr = new XMLHttpRequest();
	// 	xhr.open('get', imgUrl, true);
	// 	// 至关重要
	// 	xhr.responseType = 'blob';
	// 	xhr.onload = function () {
	// 		if (this.status == 200) {
	// 			//得到一个blob对象
	// 			var blob = this.response;
	// 			console.log('blob', blob)
	// 			//  至关重要
	// 			let oFileReader = new FileReader();
	// 			oFileReader.onloadend = function (e) {
	// 				let base64 = e.target.result;
	// 				console.log('方式一》》》》》》》》》', base64)
	// 			};
	// 			oFileReader.readAsDataURL(blob);

	// 		}
	// 	}
	// 	xhr.send();
	// }

	changeMusic = (item) => {
        const { dispatch } = this.props;
        let ar = ''
        item.song.artists.forEach((item, index) => {
            ar += item.name + ' '
        })
		let payload = {
			id: item.id,
			name: item.name,
			picUrl: item.song.album.blurPicUrl,
			ar: ar,
			src: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
		}
		dispatch({
			type: 'index/setMusic',
			payload
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
		const { song, dang } = this.state;
		const { music: { id, isPause } } = this.props.index

		return (
			<div>
				<Slider />

				<div className="pop">
					<div className="pop_box song" onClick={this.pushSong}>
						<img className="pop_img" src="data:image/png;base64,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" />
						<div className="pop_text">热门歌曲</div>
					</div>
					<div className="pop_box dang" onClick={this.pushSongList}>
						<img className="pop_img" src="data:image/png;base64,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" />
						<div className="pop_text">热门歌单</div>
					</div>
					<div className="pop_box sing" onClick={this.pushSinger}>
						<img className="pop_img" src="data:image/png;base64,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" />
						<div className="pop_text">热门歌手</div>
					</div>
				</div>

				<div className="recommend">
					<div className="recommend_title">最新音乐</div>
					{/* {
						song.map((item, index)=>{
							if(index < 9) {
								return <div className="recommend_box" key={index} onClick={() => this.changeMusic(item)}>
									<img className="recommend_img" src={item.song.album.blurPicUrl} />
									<div className="recommend_text">{item.name}</div>
								</div>
							}
						})
					} */}
					{
						song.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">{item.song.artists && item.song.artists.map((item, index) => { return ` ${item.name} ` })}</div>
								<img src={add} onClick={ () => this.addMusic(item) } className="songAdd" />
								{
									id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
								}
							</div>
						})
					}
				</div>

				<div className="recommend2">
					<div className="recommend_title2">推荐歌单</div>
					{
						dang.map((item, index)=>{
							if(index < 9) {
								return <div className="recommend_box2" key={index} onClick={() => this.pushSong2(item.id)}>
									<img className="recommend_img2" src={item.picUrl} />
									<div className="recommend_text2">{item.name}</div>
								</div>
							}
						})
					}
				</div>

			</div>
		);
	}
}

export default recommend;