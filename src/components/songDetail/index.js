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
		item: '',
		allTime: 0,
		curTime: 0,
		ALLTime: { min: '00', sec: '00' },
		CurTime: { min: '00', sec: '00' },
		deg: 0,
		turnBack: true,
		lyrics: [],
		top: '40%'
	}

	componentDidMount() {
		this.getlove()
		this.makeItem()

		this.getPlayTime()

		setTimeout(this.getTime, 500)

		this.getLyrics()
	}

	componentWillReceiveProps() {
		clearInterval(this.interval)
		
		this.getlove()
		this.makeItem()

		this.getPlayTime()
		this.getLyrics()
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
		
		clearInterval(this.interval)
		// this.setState({
		// 	deg: 0
		// })
	}

	musicBack = (id) => {
		let a = JSON.parse(localStorage.getItem('musicMenu')) || []
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
		if(next) {
			this.changeMusic(next)
		}
		
		clearInterval(this.interval)
		// this.setState({
		// 	deg: 0
		// })
	}

	getPlayTime = () => {
		const { music: { isPause } } = this.props.index
		console.log(isPause)
		if(isPause) {
			clearInterval(this.interval)
		} else {
			this.interval = setInterval(()=>{
				this.getTime()
				this.degChange()
			}, 500)
		}
	}

	getTime = () => {
		const { lyrics } = this.state
		let player = document.getElementById('player')
		let curTime = Math.floor(player.currentTime)
		let allTime = Math.floor(player.duration)
		
		let CurTime = this.getMinAndSec(curTime)
		let ALLTime = this.getMinAndSec(allTime)

		console.log(lyrics)
		lyrics.forEach((item, index)=>{
			if(index + 1 == lyrics.length) {
				if(curTime >= item.time) {
					this.setState({
						top: `${(40 - 10*index)}%`
					})
				}
			} else {
				if(curTime >= item.time && curTime < lyrics[index + 1].time) {
					this.setState({
						top: `${(40 - 10*index)}%`
					})
				}
			}
			
			
		})
		this.setState({
			allTime,
			curTime,
			CurTime,
			ALLTime
		})
	}

	degChange = () => {
		const { deg } = this.state;
		let deg2 = deg + 10;
		this.setState({
			deg: deg2
		})
	}

	getMinAndSec = (time) => {
		let sec = time % 60;
		let min = (time - sec) / 60;
		if(sec - (sec % 10) === 0) {
			sec = '0' + sec
		}
		if(min - (min % 10) === 0) {
			min = '0' + min
		}
		return { min, sec }
		// let payload = {
		// 	time: `${min}:${sec}`,
		// 	min,
		// 	sec
		// }
	}

	setTime = (time) => {
		let player = document.getElementById('player')
		player.currentTime = time
		this.getTime()
		// player.play()
	}

	touchStart(e) {
       	const { allTime } = this.state
		let _nextX = e.touches[0].pageX
		       
		let curTime = Math.floor(_nextX / document.documentElement.clientWidth * allTime)

		let CurTime = this.getMinAndSec(curTime)

		this.setTime(curTime)

        this.setState({
            curTime,
            CurTime
        })
    }
    touchMove(e) {
		// 获得移动的位置
		const { allTime } = this.state
		let _nextX = e.touches[0].pageX
		       
		let curTime = Math.floor(_nextX / document.documentElement.clientWidth * allTime)

		if(curTime <= 0) {
			curTime = 0
		}
		if(curTime >= allTime) {
			curTime = allTime
		}

		let CurTime = this.getMinAndSec(curTime)

        this.setState({
            curTime,
            CurTime
        })
    }
    touchEnd() {
		const { curTime } = this.state;
		this.setTime(curTime)
	}

	// clickJDT(e) {
	// 	const { allTime } = this.state
	// 	let _nextX = e.touches[0].pageX
		       
	// 	let curTime = Math.floor(_nextX / document.documentElement.clientWidth * allTime)

	// 	let CurTime = this.getMinAndSec(curTime)

	// 	this.setTime(curTime)

    //     this.setState({
    //         curTime,
    //         CurTime
    //     })
	// }

	handleTurn = () => {
		const { turnBack } = this.state;
		this.setState({
			turnBack: !turnBack
		})
	}

	getLyrics = () => {
		const { dispatch, index: { music } } = this.props;
		let lyrics = ''
		dispatch({
			type: 'index/getLyrics',
			payload: music.id
		})
		.then((res)=>{
			if(res.code == 200) {
				// console.log('ly', this.handleLy(res.lrc.lyric))
				this.setState({
					lyrics: this.handleLy(res.lrc.lyric)
				})
				// this.setState({
				// 	lyrics: res.lrc.lyric
				// })
			}
		})
	}

	handleLy = (lyric) => {
		let LyricList = lyric.split("\n")
		let newLyric = []
		LyricList.forEach((item, index)=>{
			
			let time = (item.slice(1,3)*60 - 0) + (item.slice(4,6) - 0)
			let ly = ''
			if(item.length > 11) {
				ly = item.slice(12 - item.length)
			}
			if(index < LyricList.length - 1) {
				newLyric.push({ time, ly })
			}
		})
		return newLyric
	}

	musicEnd = () => {
		let player = document.getElementById('player')
		console.log(player.ended)
		const { music: { id } } = this.props.index
		if(player.ended) {
			this.musicUp(id)
		}
	}

	render() {

		const { menuTop, loveList, item, curTime, CurTime, allTime, ALLTime, deg, turnBack, lyrics, top } = this.state
		const { music: { isPause, picUrl, ar, name, id } } = this.props.index

		const JDT_Style = { width: curTime / allTime * 100 + '%' }
		const JDT_Title_Style = { left: curTime / allTime * 100 + '%' }
		const IMG_Style = { transform: `rotate(${deg}deg)` }
		const lyric_Style = { top: top }
 
		return (
			<div className="songDetail_index">
				<div className="theTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div>

				{
					turnBack ? <div className="theContent" onClick={this.handleTurn}>
						<div className="theContent_cover"></div>
						<img src={picUrl} className="theContent_img" style={{...IMG_Style}} />
						<div className="theContent_name">{name}</div>
						<div className="theContent_ar">{ar}</div>
					</div> : 
					<div className="theContent" onClick={this.handleTurn}>
						<div className="lyrics_cover1"></div>
						<div className="lyrics_cover2"></div>

						<div className="lyrics_box" style={{ ...lyric_Style }}>
						{
							lyrics.map((item, index) => {
								return <div key={index} className="theContent_lyrics">{item.ly}</div>
							})
						}
						</div>
					</div>
				}
				
				<div className="theFooter">
					<div className="JinDuTiao_time">{ `${CurTime.min}:${CurTime.sec} / ${ALLTime.min}:${ALLTime.sec}` }</div>

					<div className="JinDuTiao_cover" />
					<div className="JinDuTiao" style={{...JDT_Style}} />
					<div className="JinDuTiao_title_box">
						<div className="JinDuTiao_title" style={{...JDT_Title_Style}} />
					</div>
					<div className="JinDuTiao_touch" onTouchEnd={e => this.touchEnd(e)} onTouchMove={e => this.touchMove(e)}  onTouchStart={e => this.touchStart(e)} />

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