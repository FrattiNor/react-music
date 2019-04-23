import React, { Component } from 'react';
import './index.css';

import Recommend from '../recommend'
import Rank from '../rank'
import Mine from '../mine'

import Search from './search'
import Foot from './foot'

import { menu, search, play, stop, musicMenu } from '../../assets/asset'

// import delete3 from '../../assets/delete.png'
// import looper1 from '../../assets/looper1.png'
// import looper2 from '../../assets/looper2.png'
// import looper3 from '../../assets/looper3.png'

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
		}, 500)
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
		const { bannerList, current, bodyMargin, top, delay } = this.state;
		const bodyBoxStyle = {
			transition: '0.5s',
			marginLeft: -bodyMargin * 100 + '%'
		}
		const headerStyle = {
			opacity: delay ? 0 : 1
		}

		return (
			<div className="index">
				{/* {
					delay && <div className="cover">
						<div className="loading">loading...</div>
					</div>
				} */}
				
				{/* 头部 */}
				<div className="header">
					<div className="header_left">
						{/* <img className="header_img" src={menu} /> */}
					</div>
					<div className="header_content">Music Player</div>
					<div className="header_right">
						<img onClick={this.handleSearch} className="header_img" src={search} />
					</div>

					<div className="header_bottom" style={{...headerStyle}}>
						{
							bannerList.map((item) => {
								return <div className={item === current ? 'header_bottom_font header_bottom_font2' : 'header_bottom_font'} key={item} onClick={() => this.handleClickBanner(item)}>{item}</div>
							})
						}
					</div>
					{
						delay && <div className="header_bottom">
							{
								bannerList.map((item) => {
									return <div className={item === current ? 'header_bottom_font header_bottom_font3' : 'header_bottom_font'} key={item}>{item}</div>
								})
							}
						</div>
					}
				</div>
				
				{/* 主体 */}
				<div className="body">
					{/* <div className="body_box_red" /> */}
					<div className="body_box" style={bodyBoxStyle}>
						{
							bannerList.map((item) => {
								return <div className="body_page" key={item}>
									<div className="body_page_box">
										<div className="body_page_box_box">
											{
												item === '推荐' && <Recommend />
											}
											{
												item === '排行榜' && <Rank />
											}
											{
												item === '我的' && <Mine />
											}
											{/* {
												item === '推荐' ? <Recommend /> : (item === '排行榜' ? <Rank /> : <Mine />)
											} */}
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