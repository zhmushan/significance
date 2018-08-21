import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'antd'
import TagSample from '../tagSample/tagSample'
import ArticleComments from '../articleComments/articleComments'
import { Modal, Input } from 'antd'

import Marked from 'marked'

import { defaultAvatar } from '@/const'

import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import './articleLeft.scss'
const { TextArea } = Input

export default class articleLeft extends Component {
	constructor(props) {
		super(props)
		this.state = {
			like: false,
			ModalText: '您的内容。。',
			visible: false,
			confirmLoading: false
		}
	}

	handleLike = () => {
		this.setState({
			like: !this.state.like
		})
	}

	/*  */

	showModal = () => {
		this.setState({
			visible: true
		})
	}

	handleOk = () => {
		this.setState({
			ModalText: 'The modal will be closed after two seconds',
			confirmLoading: true
		})
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false
			})
		}, 2000)
	}

	handleCancel = () => {
		console.log('Clicked cancel button')
		this.setState({
			visible: false
		})
	}

	render() {
		let test = [ 1, 2, 3, 4, 5, 6 ]
		const { visible, confirmLoading, ModalText } = this.state
		try {
			var { title, coverImg, content, type } = this.props
			var con = Marked(content)
			var Tag = type.map((v, i) => {
				return <TagSample name={v} key={i} />
			})
		} catch (error) {}

		return (
			<div className='left-article-container'>
				<Breadcrumb>
					<Breadcrumb.Item href=''>
						<span>手记</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<span>前端开发</span>
					</Breadcrumb.Item>
				</Breadcrumb>
				<img src={`/cover-img/7ff7c4f104c77555e3321be32250cfc6`} className='cover-img' alt='' />
				<div className='title'>
					<h2 className='detail-title'>{title}</h2>
					<div className='dc-profile'>
						<div className='l'>
							<span style={{ marginRight: 10 }}>2018.08.16 17:38</span>
							<span className=''>126浏览</span>
						</div>
					</div>
					<div
						className='content'
						dangerouslySetInnerHTML={{
							__html: con
						}}
					/>
					<hr />
					{/* 标签 */}
					<div className='cat-box'>{Tag}</div>
					{/* 推荐 */}
					<div className='praise-box'>
						<button className={`js-praise ${this.state.like ? 'like' : ''}`} onClick={this.handleLike}>
							<Icon type='star' className={`${this.state.like ? 'like' : ''}`} />
						</button>
						<div className='num-person'>
							<em className='num'>4</em>人推荐
						</div>
					</div>
					{/* 评论 */}
					<div id='comment'>
						<div className='author'>
							<img src={defaultAvatar} alt='' />
						</div>
						<p className='fadeInput' onClick={this.showModal}>
							共同学习，写下你的评论
						</p>
					</div>
					{/* 评论框 */}
					<Modal
						title='评论'
						visible={visible}
						onOk={this.handleOk}
						confirmLoading={confirmLoading}
						onCancel={this.handleCancel}
						okText='确认'
						cancelText='取消'
					>
						<TextArea rows={6}>{ModalText}</TextArea>
					</Modal>
					{/* 评论 */}
					{/* <div id='all-comments'>暂无评论</div> */}
					<ArticleComments />
					{/* article- */}
					<div className='article_wrap'>
						<div className='line-con'>
							<p className='line' />
							<p className='line-text'>相关文章推荐</p>
						</div>
						{test.map((v) => {
							return (
								<OpinionMainCenterList
									key={v}
									title={'我是推荐'}
									direction={'前端开发'}
									see={'188'}
									author={'张士大夫'}
									time={'8-12'}
									tag={[ '前端', '后端' ]}
								/>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}