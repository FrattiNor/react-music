import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, error } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class menu extends Component {
	state = {
		list: []
	}

	componentDidMount() {
        this.getList()
    }
    
    componentWillReceiveProps() {
        this.getList()
    }

    getList = () => {
        const par = JSON.parse(localStorage.getItem('musicMenu'))
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
		dispatch({
			type: 'index/setMusic',
			payload
		})
	}
    
    delMusic = (item) => {
        const par = JSON.parse(localStorage.getItem('musicMenu'))
        let a = par.filter((item2)=>{
            return item.id != item2.id
        })
        localStorage.setItem('musicMenu', JSON.stringify(a))
        this.getList()
	}
	
	musicPlay = (isPause) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/setPause',
			isPause
		})
	}

	render() {

		const { list } = this.state
		const { music: { id, isPause } } = this.props.index

		return (
			<div className="menu_index">

				{/* <div className="songTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div> */}

				<div className="songBody">
					{
						list.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}</div>
								<img onClick={ () => this.delMusic(item) } className="songDel" src={error} />
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