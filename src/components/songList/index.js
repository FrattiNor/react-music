import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class songList extends Component {
	state = {
		list: []
	}

	componentDidMount() {
		const par = JSON.parse(sessionStorage.getItem('songListPage')) || []
        const { dispatch } = this.props
		if(par) {
			const { type } = par
			dispatch({
				type,
			})
			.then((res)=>{
				if(res.code == 200) {
                    let { playlists } = res;

                    playlists.forEach(async (item, index)=>{
                        let listDetail = await this.getDetail(item.id);
                        listDetail = listDetail.slice(0,3);
                        playlists[index].tracks = listDetail;
                        await this.setState({
                            list: playlists
                        })
                    })

				}
			})
		}
	}

	songBack = () => {
		const { dispatch } = this.props;
		dispatch(routerRedux.goBack())
    }
    
    getDetail = (id) => {
        const { dispatch } = this.props;
        return dispatch({
            type: 'index/getSongListDetail',
            payload: id
        })
        .then((res)=>{
            if(res.code == 200) {
                return res.playlist.tracks
            }
        })
    }

    pushSong = (item) => {
		const { dispatch } = this.props;
        sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getSongListDetail', payload: item.id, item }))
        let a = JSON.parse(sessionStorage.getItem('title')) || []
        a.push({ name: item.name, type: 'list' })
		sessionStorage.setItem('title', JSON.stringify(a))
		dispatch(routerRedux.push('/song'));
	}

	render() {

		const { list } = this.state

		return (
			<div className="song_index">

				{/* <div className="songTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div> */}

				<div className="songBody">
                {
                    list.map((item, index) => {
                        return <div key={index} className="rank_official_box" onClick={() => this.pushSong(item)}>
                            <div className="official_img_box">
                                <img className="official_img" src={item.coverImgUrl} />
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

			</div>
		);
	}
}

export default songList;