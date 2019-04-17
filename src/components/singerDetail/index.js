import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class song extends Component {
	state = {
        current: '单曲',
        song: [],
        songList: [],
        it: ''
	}

	componentDidMount() {
        let singerDetail = JSON.parse(sessionStorage.getItem('singerDetail'))
        this.setState({
            id: singerDetail.id,
            name: singerDetail.name,
            pic: singerDetail.pic
        })

        this.getSingerSong(singerDetail.id)
        this.getSingerSongList(singerDetail.id)
        this.getSingerIt(singerDetail.id)
	}

    
    getSingerSong = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/getSingerSong',
            payload: id
        })
        .then((res)=>{
            this.setState({
                song: res.hotSongs
            })
        })
    }

    getSingerSongList = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/getSingerSongList',
            payload: id
        })
        .then((res)=>{
            // this.setState({
            //     songList: res.hotAlbums
            // })
            res.hotAlbums.forEach(async (item, index)=>{
                let listDetail = await this.getDetail(item.id);
                listDetail = listDetail.slice(0,3);
                res.hotAlbums[index].tracks = listDetail;
                await this.setState({
                    songList: res.hotAlbums
                })
            })
        })
    }

    getDetail = (id) => {
        const { dispatch } = this.props;
        return dispatch({
            type: 'index/getAlbum',
            payload: id
        })
        .then((res)=>{
            if(res.code == 200) {
                return res.songs
            }
        })
    }

    getSingerIt = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/getSingerIt',
            payload: id
        })
        .then((res)=>{
            this.setState({
                it: res.briefDesc
            })
        })
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
    
    changeCurrent = (current) => {
        this.setState({
            current
        })
    }

    pushSong = (id) => {
		const { dispatch } = this.props;
		sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getAlbum', payload: id }))
		dispatch(routerRedux.push('/song'));
	}

	render() {
        const { pic, name, current, song, songList, it } = this.state
        const { music: { id, isPause } } = this.props.index
		return (
			<div className="song_index">

                <div className="singerDetail_bg">
                    <img src={pic} className="singerDetail_img" />
                    <div className="singerDetail_name">{name}</div>
                </div>

                <div className="singerDetail_content">
                    <div className={ current == '单曲' ? 'content_title title_red' : 'content_title' } onClick={() => this.changeCurrent('单曲')}>单曲</div>
                    <div className={ current == '专辑' ? 'content_title title_red' : 'content_title' } onClick={() => this.changeCurrent('专辑')}>专辑</div>
                    <div className={ current == '关于TA' ? 'content_title title_red' : 'content_title' } onClick={() => this.changeCurrent('关于TA')}>关于TA</div>

                    {
                        current == '单曲' ? <div className="content_box">
                            <div className="songBody">
                                {
                                    song.map((item, index)=>{
                                        return <div className="songList" key={index}>
                                            <div className="songName">{item.name}</div>
                                            <div className="songArtists">{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}</div>
                                            {
                                                id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div> : ( current == '专辑' ? <div className="content_box">
                            <div className="songBody">
                            {
                                songList.map((item, index) => {
                                    return <div key={index} className="rank_official_box" onClick={() => this.pushSong(item.id)}>
                                        <div className="official_img_box">
                                            <img className="official_img" src={item.picUrl} />
                                        </div>
                                        <div className="official_introduction">
                                        <div className="official_introduction_name">{item.name}</div>
                                            <div className="official_box">
                                                {
                                                    item.tracks && item.tracks.map((item, index)=>{
                                                        return  <div className="introduction" key={index}>{`${index + 1}. ${item.name} - ${item.ar[0].name}`}</div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            </div>
                        </div> : <div className="content_box">
                            <div className="songBody"><div className="content_box_it">{it}</div></div>
                        </div> )
                    }

                </div>

				{/* <div className="songBody">
					{
						list.map((item, index)=>{
							return <div className="songList" key={index}>
								<div className="songName">{item.name}</div>
								<div className="songArtists">{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}</div>
								{
									id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
								}
							</div>
						})
					}
				</div> */}

			</div>
		);
	}
}

export default song;