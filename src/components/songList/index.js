import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class index extends Component {
	state = {
		list: []
	}

	componentDidMount() {
		const par = JSON.parse(sessionStorage.getItem('songListPage'))
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
            return res.playlist.tracks
        })
    }

    pushSong = (id) => {
		const { dispatch } = this.props;
		sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getSongListDetail', payload: id }))
		dispatch(routerRedux.push('/song'));
	}

	render() {

		const { list } = this.state

		return (
			<div className="index">

				<div className="songTop">
					<img onClick={this.songBack} className="songBack" src={back} />
				</div>

				<div className="songBody">
                {
                    list.map((item, index) => {
                        return <div key={index} className="rank_official_box" onClick={() => this.pushSong(item.id)}>
                            <div className="official_img_box">
                                <img className="official_img" src={item.coverImgUrl} />
                            </div>
                            <div className="official_introduction">
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

				<div className="footer">
					<div className="footer_img"></div>
					<div className="footer_text">The Show</div>
					<div className="footer_text2">The ShowThe ShowThe ShowThe Show</div>

					{/* <img className="footer_play" src={stop} /> */}
					<img className="footer_play" src={play} />
					<img onClick={this.handleMenu} className="footer_menu" src={musicMenu} />
				</div>

			</div>
		);
	}
}

export default index;