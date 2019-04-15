import React, { Component } from 'react';
import './index.css';

import Recommend from '../recommend'
import Rank from '../rank'
import Mine from '../mine'

import Search from './search'
import Foot from './foot'

import { menu, search, play, stop, musicMenu } from '../../assets/asset'

class index extends Component {
	state = {
		bannerList: ['推荐', '排行榜', '我的'],
		current: '推荐',
		bodyMargin: 0,
		top: '100%',
		menuTop: '100%',
		delay: true
	}

	componentDidMount() {
		setTimeout(()=>{
			this.setState({
				delay: false
			})
		}, 1000)
	}

	handleClickBanner = (current) => {
		const { bannerList } = this.state;
		let bodyMargin
		bannerList.forEach((item, index) => {
			if (current === item) {
				bodyMargin = index
			}
		})
		this.setState({
			bodyMargin,
			current
		})
	}

	handleSearch = () => {
		this.setState({
			top: '0'
		})
	}

	handleSearchBack = () => {
		this.setState({
			top: '100%'
		})
	}

	render() {
		const { bannerList, current, bodyMargin, top, delay } = this.state;
		const bodyBoxStyle = {
			transition: '0.5s',
			marginLeft: -bodyMargin * 100 + '%'
		}

		return (
			<div className="index">
				{
					delay && <div className="cover">
						<div className="loading">loading...</div>
					</div>
				}
				
				{/* 头部 */}
				<div className="header">
					<div className="header_left">
						{/* <img className="header_img" src={menu} /> */}
					</div>
					<div className="header_content">Music Player</div>
					<div className="header_right">
						<img onClick={this.handleSearch} className="header_img" src={search} />
					</div>

					<div className="header_bottom">
						{
							bannerList.map((item) => {
								return <div className={item === current ? 'header_bottom_font header_bottom_font2' : 'header_bottom_font'} key={item} onClick={() => this.handleClickBanner(item)}>{item}</div>
							})
						}
					</div>
				</div>
				
				{/* 主体 */}
				<div className="body">
					<div className="body_box" style={bodyBoxStyle}>
						{
							bannerList.map((item) => {
								return <div className="body_page" key={item}>
									<div className="body_page_box">
										<div className="body_page_box_box">
											{
												item === '推荐' ? <Recommend /> : (item === '排行榜' ? <Rank /> : <Mine />)
											}
										</div>
									</div>
								</div>
							})
						}
					</div>
				</div>
				
				{/* 搜索 */}
				<div className="serach" style={{ top }}>
					<Search handleSearchBack={this.handleSearchBack} />
				</div>

			</div>
		);
	}
}

export default index;