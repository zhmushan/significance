import React, { Component } from 'react'
import { Tag, Icon, Modal } from 'antd'
import Marked from 'marked'
import { ArticleType, defaultAvatar, ArticleCategoryAll } from '@/const.js'
import './backstateArticleItem.scss'
export default class backstateArticleItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			authorUsername: '',
			content: '',
			title: '',
		}
	}

	showModal = (obj) => {
		this.setState({
			visible: true,
			authorUsername: obj.authorUsername,
			content: obj.content,
			title: obj.title,
		})
	}

	handleOk = (e) => {
		this.setState({
			visible: false,
		})
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		})
	}
	removeHTMLTag(str) {
		str = str.replace(/<\/?[^>]*>/g, '') //去除HTML tag
		str = str.replace(/[ | ]*\n/g, '\n') //去除行尾空白
		//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
		str = str.replace(/&nbsp;/gi, '') //去掉&nbsp;
		return str
	}
	render() {
		const { authorName, authorAvatar, title, type, content, category, createTime, viewNum } = this.props
		return (
			<div className='backstage-article-item'>
				<h2>{ArticleCategoryAll[category]}</h2>
				<h4>
					<a onClick={() => this.showModal(this.props)}>{title}</a>
				</h4>
				<div className='backstage-article-item-tags'>
					{type.map((item, index) => {
						return <Tag key={index}>{ArticleType[item]}</Tag>
					})}
				</div>
				<div className='backstage-article-item-content'>
					<p>{this.removeHTMLTag(Marked(content))}</p>
				</div>
				<div className='backstage-article-item-authorInfo'>
					<img src={authorAvatar ? `/avatar/${authorAvatar}` : defaultAvatar} alt='' />
					<a style={{ marginLeft: 10 }}>{authorName}</a>
					<span>发布于</span>
					<span style={{ color: 'rgba(0, 0, 0, .25)' }}>{createTime}</span>
				</div>
				<div className='backstage-article-item-data'>
					<ul>
						<li>
							<Icon type='eye' />
							<span>{viewNum}</span>
						</li>
						<em />
					</ul>
				</div>
				<Modal title='文章详情' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<p>作者：{this.state.authorUsername}</p>
					<p>题目：{this.state.title}</p>
					<p
						dangerouslySetInnerHTML={{
							__html: Marked(this.state.content),
						}}
					/>
				</Modal>
			</div>
		)
	}
}
