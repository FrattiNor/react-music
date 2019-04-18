import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, love, love_red } from '../../assets/asset'

import Song from '../song'
import Singer from '../singer'
import SongList from '../songList'
import SingerDetail from '../singerDetail'

@connect(({ index }) => ({
    index
}))
class theBack extends Component {
	state = {
		pathname: '',
		title: '',
		type: '',
		item: {}
	}

	componentDidMount() {
		let a = JSON.parse(sessionStorage.getItem('title')) || []
		a = a[a.length - 1]
        let pathname = this.props.location.pathname;
        this.setState({
			pathname,
			title: a.name,
			type: a.type
		})
		
		this.getSongListLove()

		let b = JSON.parse(sessionStorage.getItem('songPage')) || []
		this.setState({
			item: b.item
		})
	}

	componentWillReceiveProps() {
		this.getSongListLove()
	}

	getSongListLove = () => {
		let d = JSON.parse(localStorage.getItem('songListLove')) || [];
		let e = [];
		d.forEach((item)=>{
			e.push(item.id)
		})
		this.setState({
			songListLove: e,
			songListLove2: d
		})
	}

	songBack = () => {
		const { dispatch } = this.props;
		let a = JSON.parse(sessionStorage.getItem('title')) || []
		a.pop()
		sessionStorage.setItem('title', JSON.stringify(a))
		dispatch(routerRedux.goBack())
	}

	loveList = (love) => {
		let a = JSON.parse(sessionStorage.getItem('songPage')) || []
		let item = a.item

		const { dispatch } = this.props;

		let b = JSON.parse(localStorage.getItem('songListLove')) || [];
		let c = b.filter((item2)=>{
			return item.id != item2.id
		})
		if(love) {
			c.push(item);
		}
		localStorage.setItem('songListLove', JSON.stringify(c))
		dispatch({
			type: 'index/update'
		})
	}

	render() {
        const { pathname, title, type, songListLove, songListLove2, item } = this.state
		return (
			<div className="index">

				<div className="songTop">
					<img onClick={this.songBack} className="songBack" src={back} />
					<div className="backTitle">{ title }</div>
					{		
						type === 'list' && <img src={songListLove.indexOf(item.id) == -1 ? love : love_red} onClick={songListLove.indexOf(item.id) == -1 ? () => this.loveList(true) :  () => this.loveList(false) } className="listLove" />
					}
				</div>
				{
					pathname === '/song' && <Song />
				}
				{
					pathname === '/singer' && <Singer />
				}
				{
					pathname === '/songList' && <SongList />
				}
				{
					pathname === '/singerDetail' && <SingerDetail />
				}
			</div>
		);
	}
}

export default theBack;