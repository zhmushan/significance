import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hotSort } from '@/util/hotSort.js'
import { fetchArticleAll } from '@/redux/actions.js'
import { withRouter } from 'react-router'
@withRouter
@connect((state) => state.article, { fetchArticleAll })
export default class OpinionBanner extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articleArray: [],
		}
	}
	async componentDidMount() {
		await this.props.fetchArticleAll()
		this.setState({
			articleArray: hotSort(this.props.articleArray),
		})
	}
	toSee(item) {
		this.props.history.push(`/article/${item.id}`)
	}
	render() {
		const { articleArray } = this.state
		let first = articleArray[0]
		let second = articleArray[1]
		let thirth = articleArray[2]
		console.log(first)
		return (
			<React.Fragment>
				<div className='centerlist'>
					{articleArray.length >= 3 ? (
						<div className='bannerBox'>
							<div className='leftImg'>
								<img
									src={`/cover-img/${first.coverImg}`}
									alt=''
									style={{ cursor: 'pointer' }}
									onClick={this.toSee.bind(this, first)}
								/>
								<div className='bannerDescription'>{first.title}</div>
							</div>
							<div className='rightImg'>
								<div className='topImg'>
									<img
										src={`/cover-img/${second.coverImg}`}
										alt=''
										style={{ cursor: 'pointer' }}
										onClick={this.toSee.bind(this, second)}
									/>
									<div className='bannerDescription2'>{second.title}</div>
								</div>
								<div className='bottomImg'>
									<img
										src={`/cover-img/${thirth.coverImg}`}
										alt=''
										style={{ cursor: 'pointer' }}
										onClick={this.toSee.bind(this, thirth)}
									/>
									<div className='bannerDescription2'>{thirth.title}</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</React.Fragment>
		)
	}
}
