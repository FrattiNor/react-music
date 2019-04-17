import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back, love, love_red, add } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class song extends Component {
	state = {
        current: '单曲',
        song: [],
        songList: [],
        it: '',
        loveList: []
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
        this.getlove()
    }

    componentWillReceiveProps() {
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
        const { pic, name, current, song, songList, it, loveList } = this.state
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
                                            <img src={loveList.indexOf(item.id) == -1 ? love : love_red} onClick={loveList.indexOf(item.id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="songLove" />
                                            <img onClick={ () => this.addMusic(item) } className="songAdd" src={add} />
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