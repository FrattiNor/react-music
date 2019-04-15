import React, { Component } from 'react';
import './index.css';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { play, stop, musicMenu, back } from '../../assets/asset'

@connect(({ index }) => ({
    index
}))
class singer extends Component {
	state = {
		list: []
	}

	componentDidMount() {
		if(this.props.singer == undefined) {
			const par = JSON.parse(sessionStorage.getItem('singerPage'))
			const { dispatch } = this.props
			if(par) {
				const { type } = par
				dispatch({
					type,
				})
				.then((res)=>{
					if(res.code == 200) {
						this.setState({
							list: res.artists || res.list.artists
						})
					}
				})
			}
		}
		else {
			this.setState({
				list: this.props.singer
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			list: nextProps.singer
		})
	}

	songBack = () => {
		const { dispatch } = this.props;
		dispatch(routerRedux.goBack())
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
					list.map((item, index)=>{
						return <div className="songList" key={index}>
							<img className="singerImg" src={item.img1v1Url} />
							<div className="singerName">{item.name}</div>
						</div>
					})
				}
				</div>

			</div>
		);
	}
}

export default singer;