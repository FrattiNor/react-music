import React, { Component } from 'react';
import './index.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'

@connect(({ index }) => ({
    index
}))
class rank extends Component {
	state = {
		// official: ['云音乐飙升榜', '云音乐新歌榜', '网易原创歌曲榜', '云音乐热歌榜'],
		// recommend: ['江小白YOLO云音乐说唱榜', '以团之名发光榜', '云音乐古典音乐榜', '云音乐电音榜', '抖音排行榜', '云音乐ACG音乐榜'],
		// world: ['UK排行榜周榜', '美国Billboard排行榜', 'Beatport全球电子舞曲榜', '法国 NRJ Vos Hits 周榜', 'iTunes榜', '日本Oricon周榜'],
		// more: ['云音乐韩语榜', '云音乐国电榜', '英国Q杂志中文版周榜', '电竞音乐榜', 'KTV唛榜', 'Hit FM Top榜', '台湾Hito排行榜', '香港电台中文歌曲龙虎榜', '新声榜'],

		official: [3, 0, 2, 1],
		recommend: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
		

		// id_list: [
		// 	"云音乐新歌榜",

		// 	"云音乐热歌榜",

		// 	"网易原创歌曲榜",

		// 	"云音乐飙升榜",

		// 	"云音乐电音榜",

		// 	"UK排行榜周榜",

		// 	"美国Billboard周榜",

		// 	"KTV嗨榜",

		// 	"iTunes榜",

		// 	"Hit FM Top榜",

		// 	"日本Oricon周榜",

		// 	"韩国Melon排行榜周榜",

		// 	"韩国Mnet排行榜周榜",

		// 	"韩国Melon原声周榜",

		// 	"中国TOP排行榜(港台榜)",

		// 	"中国TOP排行榜(内地榜)",

		// 	"香港电台中文歌曲龙虎榜",

		// 	"华语金曲榜",

		// 	"中国嘻哈榜",

		// 	"法国 NRJ EuroHot 30周榜",

		// 	"台湾Hito排行榜",

		// 	"Beatport全球电子舞曲榜",

		// 	"云音乐ACG音乐榜",

		// 	"云音乐嘻哈榜"
		// ],
		sing_rank: [],
		song_rank_1: [],
		song_rank_2: [],
	}

	componentDidMount() {
		this.getSingRank();
		this.getSongRank();
	}

	getSingRank = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'index/getSingRank'
		})
		.then((res)=>{
			this.setState({
				sing_rank: res.list.artists
			})
		})
	}

	getSongRank = () => {
		const { dispatch } = this.props;
		const { official, recommend, song_rank_1, song_rank_2 } = this.state;

		official.forEach((item) => {
			dispatch({
				type: 'index/getRankSong',
				payload: item
			})
			.then((res)=>{
				song_rank_1.push(res.playlist)
				this.setState({
					song_rank_1: [...song_rank_1]
				})
			})
		})

		recommend.forEach((item) => {
			dispatch({
				type: 'index/getRankSong',
				payload: item
			})
			.then((res)=>{
				song_rank_2.push(res.playlist)
				this.setState({
					song_rank_2: [...song_rank_2]
				})
			})
		})
		
	}

	pushSong = (id) => {
		const { dispatch } = this.props;
		sessionStorage.setItem('songPage', JSON.stringify({ type: 'index/getSongListDetail', payload: id }))
		dispatch(routerRedux.push('/song'));
	}

	pushSinger = () => {
		const { dispatch } = this.props;
		sessionStorage.setItem('singerPage', JSON.stringify({ type: 'index/getSingRank' }))
		dispatch(routerRedux.push('/singer'));
	}

	pushSingerDetail = (item) => {
		sessionStorage.setItem('singerDetail',JSON.stringify({name: item.name, id: item.id, pic: item.img1v1Url}))
		const { dispatch } = this.props;
		dispatch(routerRedux.push('/singerDetail'))
	}

	render() {
		const { sing_rank, song_rank_1, song_rank_2, official, recommend } = this.state;

		return (
			<div className="rank_page">

				<div className="rank_sing">
					<div className="rank_title" onClick={this.pushSinger}>歌手榜</div>
					{
						sing_rank.map((item, index)=>{
							if(index < 5) {
								return <div key={index} className="rank_sing_box" onClick={ () => this.pushSingerDetail(item) }>
											<img className="rank_sing_img" src={item.img1v1Url} />
											<div className="rank_sing_name">{item.name}</div>
										</div>
							}
						})
					}
				</div>

				<div className="rank_official">
					<div className="rank_title">官方榜</div>
					{
						song_rank_1.map((item, index) => {
							return <div key={index} className="rank_official_box" onClick={() => this.pushSong(item.id)}>
								<div className="official_img_box">
									<img className="official_img" src={item.coverImgUrl} />
								</div>
								<div className="official_introduction2">
									<div className="official_box2">
										<div className="introduction2">{`1. ${item.tracks[0].name} - ${item.tracks[0].ar[0].name}`}</div>
										<div className="introduction2">{`2. ${item.tracks[1].name} - ${item.tracks[1].ar[0].name}`}</div>
										<div className="introduction2">{`3. ${item.tracks[2].name} - ${item.tracks[2].ar[0].name}`}</div>
									</div>
								</div>
							</div>
						})
					}

				</div>

				<div className="rank_recommend">
					<div className="rank_title">推荐榜</div>
					{
						song_rank_2.map((item, index) => {
							return <div key={index} className="rank_recommend_box" onClick={() => this.pushSong(item.id)}>
								<div className="recommend_img_box">
									<img className="recommend_img" src={item.coverImgUrl} />
									<div className="recommend_text">{item.name}</div>
								</div>
							</div>
						})
					}
				</div>

			</div>
		);
	}
}

export default rank;