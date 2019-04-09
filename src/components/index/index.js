import React, { Component } from 'react';
import './index.css';

import Recommend from '../recommend'
import Rank from '../rank'
import Mine from '../mine'

import Search from './search'

import { menu, search, play, stop, musicMenu } from '../../assets/asset'

class index extends Component {
	state = {
		bannerList: ['推荐', '排行榜', '我的'],
		current: '推荐',
		bodyMargin: 0,
		top: '100%',
		menuTop: '100%'
	}

	componentDidMount() {

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

	handleMenu = () => {
		this.setState({
			menuTop: '0'
		})
	}

	handleMenuBack = () => {
		this.setState({
			menuTop: '100%'
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

	render() {
		const { bannerList, current, bodyMargin, top, menuTop } = this.state;
		const bodyBoxStyle = {
			transition: '0.5s',
			marginLeft: -bodyMargin * 100 + '%'
		}

		return (
			<div className="index">
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

				<div className="footer">
					<div className="footer_img"></div>
					<div className="footer_text">The Show</div>
					<div className="footer_text2">The ShowThe ShowThe ShowThe Show</div>

					{/* <img className="footer_play" src={stop} /> */}
					<img className="footer_play" src={play} />
					<img onClick={this.handleMenu} className="footer_menu" src={musicMenu} />
				</div>


				{/* <div className="serach" style={{ top }}>
					<div className="serach_back" onClick={this.handleSearchBack}></div>
				</div> */}
				
				<div className="serach" style={{ top }}>
					<Search handleSearchBack={this.handleSearchBack} />
				</div>

				<div className="musicMenu" style={{ top: menuTop }}>
					<div className="musicMenu_back" onClick={this.handleMenuBack}></div>
					<div className="musicMenu_content"></div>
				</div>
			</div>
		);
	}
}

export default index;