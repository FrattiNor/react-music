import React, { Component } from 'react';
import './index.css';
import { connect } from 'dva';

import Song from '../../song';
import Singer from '../../singer';

import { back, error, search_black, play, stop, add, love, love_red } from '../../../assets/asset'

@connect(({ index }) => ({
    index
}))
class search extends Component {
	state = {
        marginLeft: '0',
        current: 'song',
        keywords: '',
        song: [],
        singer: [],
        loveList: [],
        menuList: []
	}

	componentDidMount() {
        this.getlove()
        this.getMenu()
    }

    componentWillReceiveProps() {
        this.getlove()
        this.getMenu()
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
    
    handleChange = (current, marginLeft) => {
        this.setState({
            current,
            marginLeft
        })
    }

    getText = (e) => {
        this.setState({
            keywords: e.target.value
        })
    }

    deleteText = () => {
        this.setState({
            keywords: '',
            song: [],
            singer: [],
        })
    }

    searchText = () => {
        const { keywords } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: 'index/search',
            payload: {
                keywords,
                type: 1
            }
        })
        .then((res)=>{
            if(res.code == 200) {
                res.result.songs.forEach(async (item, index) => {
                    let songDetail = await this.getSongDetail(item.id);
                    res.result.songs[index] = songDetail;
                    await this.setState({
                        song: res.result.songs || []
                    })
                })
            }
        })

        dispatch({
            type: 'index/search',
            payload: {
                keywords,
                type: 100
            }
        })
        .then((res)=>{
            if(res.code == 200) {
                this.setState({
                    singer: res.result.artists || []
                })
            }
        })
    }

    getSongDetail = (id) => {
        const { dispatch } = this.props;
        return dispatch({
            type: 'index/getSongDetail',
            payload: id
        })
        .then((res)=>{
            return res.songs[0]
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
        const { marginLeft, current, keywords, song, singer, loveList, menuList } = this.state
        const { handleSearchBack } = this.props;
        const { music: { id, isPause } } = this.props.index

		return (
            <div className="search_index">
                <img className="serach_back" src={back} onClick={handleSearchBack} />
                <input type="text" className="search_text" onChange={this.getText} value={keywords} />
                <img className="serach_error" src={error} onClick={this.deleteText} />
                <img className="serach_search" src={search_black} onClick={this.searchText} />

                <div className="search_content">
                    <div className="search_content_title">
                        <div onClick={(e) => this.handleChange('song', '0')} className={current == 'song' ? "search_content_title_text current" : 'search_content_title_text'}>单曲</div>
                        <div onClick={(e) => this.handleChange('singer', '-100%')} className={current == 'singer' ? "search_content_title_text current" : 'search_content_title_text'}>歌手</div>
                    </div>

                    <div className="search_content_body">
                        <div className="search_body" style={{ marginLeft }}>
                            <div className="search_content_song search_body_body">
                                {/* <Song song={song} /> */}
                                {
                                    song.map((item, index)=>{
                                        return <div className="songList" key={index}>
                                            <div className="songName">{item.name}</div>
                                            <div className="songArtists">{item.ar && item.ar.map((item, index) => { return ` ${item.name} ` })}</div>
                                            <img src={loveList.indexOf(item.id) == -1 ? love : love_red} onClick={loveList.indexOf(item.id) == -1 ? () => this.loveMusic(item, true) :  () => this.loveMusic(item, false) } className="songLove" />
                                            <img onClick={ menuList.indexOf(item.id) == -1 ? () => this.addMusic(item) : () => this.delMusic(item) } className="songAdd" src={menuList.indexOf(item.id) == -1 ? add : error} />
                                            {
                                                id === item.id ? ( isPause ? <img className="songPlay" src={play} onClick={() => this.musicPlay(false)} /> : <img className="songPlay" src={stop} onClick={() => this.musicPlay(true)} /> ) : <img className="songPlay" src={play} onClick={() => this.changeMusic(item)} />
                                            }
                                            {/* <img className="songPlay" src={play} /> */}
                                        </div>
                                    })
                                }
                            </div>
                            <div className="search_content_singer search_body_body">
                                <div className="singer_box_box">
                                    <Singer singer={singer} />
                                </div>
                                
                                {/* {
                                    singer.map((item, index)=>{
                                        return <div className="songList" key={index}>
                                            <img className="singerImg" src={item.img1v1Url} />
                                            <div className="singerName">{item.name}</div>
                                        </div>
                                    })
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default search;