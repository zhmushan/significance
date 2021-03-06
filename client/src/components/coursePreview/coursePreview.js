import React, { Component } from "react"
import "./coursePreview.scss"
import { Tabs, Input } from "antd"
import CustomIcon from "@/common/customIcon/customIcon"
import { getVideoComment, getCourseOne, courseRate, updateMyCourse, updateUserShoppingCart } from "@/redux/actions.js"
import { Rate } from "antd"
import Share from "@/share"
import axios from "axios"
import Cookies from "js-cookie"
import { defaultAvatar } from "@/const"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { message } from "antd"
const TabPane = Tabs.TabPane
const { TextArea } = Input
@withRouter
@connect(
  state => state,
  { getVideoComment, getCourseOne, courseRate, updateMyCourse, updateUserShoppingCart }
)
export default class CoursePreview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			courseId: this.props.match.params.courseId,
			course: {},
			summary: '',
			rate: '',
			users: [],
			shoppingCartCourses: [],
			comments: [],
		}
	}
	stateChange(key, value) {
		this.setState({
			[key]: value,
		})
	}
	async toStudy() {
		// 判断是否要钱
		const { courseId } = this.state
		if (this.props.video.course.price === 0) {
			const res = await axios({
				method: 'put',
				url: `/api/courses/join`,
				headers: {
					token: Cookies.get('_token'),
				},
				data: [ courseId ],
			})
			if (res.data.code === 1) {
				this.props.updateMyCourse([ courseId, ...this.props.userstatus.joinCourse ])
				message.success('加入课程成功')
			}
			this.props.history.push(`/video/${this.state.courseId}`)
		} else {
			let shoppingCartCourses = this.props.userstatus.shoppingcart
			if (shoppingCartCourses.indexOf(this.state.courseId) === -1) {
				let res = await axios({
					method: 'put',
					url: `/api/users/shoppingcart`,
					headers: {
						token: Cookies.get('_token'),
					},
					data: [ ...shoppingCartCourses, this.state.courseId ],
				})
				if (res.data.code === 1) {
					this.props.updateUserShoppingCart([ this.state.courseId, ...this.props.userstatus.shoppingcart ])
					message.success('加入购物车成功')
				}
			} else {
				message.warn('你可以观看视频了')
				this.props.history.push(`/video/${this.state.courseId}`)
			}
		}
	}
	async componentDidMount() {
		//获取指定课程
		await this.props.getCourseOne(this.state.courseId)
		let rate = await this.props.video.rate
		let rateArray = await Object.keys(rate)
		await axios({
			method: 'post',
			url: `/api/users/ids`,
			data: rateArray,
		}).then((res) => {
			let data = res.data.data
			let users = []
			for (let i = 0; i < rateArray.length; i++) {
				for (let j = 0; j < data.length; j++) {
					console.log(data[j].id === rateArray[i])
					if (data[j].id === rateArray[i]) {
						users.push(data[j])
					}
				}
				if (i === rateArray.length - 1) {
					console.log('object')
					this.setState({
						users: users,
					})
				}
			}
		})
		let commentsId = this.props.video.course.commentsId
		let res = await axios({
			method: 'POST',
			url: `/api/articles/comment/ids`,
			headers: {
				token: Cookies.get('_token'),
			},
			data: commentsId,
		})
		if (res.data.code === 1) {
			this.setState({
				comments: res.data.data,
			})
		}
	}
	callback(key) {
		console.log(key)
	}
	// 发表评分
	async handleSendRate() {
		await this.props.courseRate(this.state.courseId, this.state.rate - 0, this.state.summary)
		if (this.props.video.code === 1) {
			message.success('评论成功')
		} else {
			message.warn('请查看是否加入课程了')
		}
		this.setState({
			summary: '',
		})
	}
	handleSee(id) {
		console.log(id)
	}
	render() {
		const { users } = this.state
		console.log(users)
		const video = this.props.video
		const { course } = video
		const sections = course.sections ? course.sections : []
		const comment = this.state.comments
		const difficulty = [ '初级', '中级', '高级' ]
		let loginuser = this.props.userstatus.avatar
		let rateComment = video.rateComment
		let rate = video.rate
		let rateArray = rate ? Object.keys(rate) : []
		let rateValue = rate ? Object.values(rate) : []
		let num =
			rateValue.length !== 0
				? rateValue.reduce((a, b) => {
						return a + b
					})
				: 5
		let rateLength = rateArray.length === 0 ? 1 : rateArray.length
		let average = num / rateLength
		// let rateCommentArray = rateComment ? Object.keys(rateComment) : []
		let isJoin = this.props.userstatus
			? this.props.userstatus.joinCourse ? this.props.userstatus.joinCourse.indexOf(this.state.courseId) === -1 : true
			: true
		console.log(rateArray, this.state.users)
		return (
			<div className='course-class-infos-container'>
				<div className='course-class-infos'>
					<div className='w'>
						<div className='path'>
							<a href='/'>实战</a>
							<i className='path-split'>\</i>
							<span>{course.title}</span>
						</div>
						<div className='extra'>
							<div className='page-share'>
								<a onClick={() => Share.shareToQQZone(course.title, `/class/1/`)}>
									<CustomIcon type='qq' color='#b6b9bc' size={26} />
								</a>
								<a onClick={() => Share.shareToDouban(course.title, `/class/2/`)}>
									<CustomIcon type='douban_F' color='#b6b9bc' size={24} />
								</a>
								<a onClick={() => Share.shareToWeibo(course.title, `/class/2/`)}>
									<CustomIcon type='weibo' color='#b6b9bc' size={24} />
								</a>
							</div>
						</div>
					</div>
					<div className='info-warp'>
						<div className='title-box'>
							<h1>{course.title}</h1>
						</div>
						<div className='splitline' />
						<div className='info-bar'>
							<div className='statics'>
								<div className='info-author'>
									<img src={course.authorAvatar ? `/avatar/${course.authorAvatar}` : defaultAvatar} alt='' />
									<span>{course.authorUsername}</span>
								</div>
								<span>
									难度
									{difficulty[course.difficulty]}
								</span>
								<span>时长17小时</span>
								<span>
									学习人数
									{course.joinersId ? course.joinersId.length : 0}
								</span>
								<span>
									综合评分
									{average}分
								</span>
							</div>
						</div>
					</div>
				</div>

        <div className="course-content">
          <div className="course-aside-info">
            <div className="learn-btn">
              <button onClick={() => this.toStudy()}>
                {this.props.video.course.price === 0 || isJoin === false
                  ? "开始学习"
                  : "加入购物车"}
              </button>
            </div>
            <div className="course-info-tip">
              <dl className="first">
                <dt>课程须知</dt>
                <dd>1、了解 Unity3D引擎基本操作</dd>
                <dd>2、了解基本 C#语法</dd>
              </dl>
              <dl>
                <dt>老师告诉你能学到什么？</dt>
                <dd>1、Rigidbody组件的面板属性</dd>
                <dd>2、了解基本 C#语法</dd>
                <dd>2、了解基本 C++语法</dd>
              </dl>
              <dl />
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            size="large"
            className="tab-course-preview"
          >
            <TabPane tab="课程章节" key="1">
              <div className="chapter">
                <div className="course-description">{course.desc}</div>
              </div>
              {sections
                ? sections.map((v, i) => (
                    <div className="chapter course-wrap" key={v.title}>
                      <ul className="video">
                        <li>{`第${i + 1}章- ` + v.title}</li>
                        {v.nodes ? (
                          <React.Fragment>
                            {v.nodes.map((b, j) => {
                              return (
                                <li
                                  key={b.title}
                                  className="hover"
                                  onClick={() => {
                                    this.handleSee(b.video)
                                  }}
                                >
                                  <CustomIcon
                                    type={"video02"}
                                    size={16}
                                    className="video-logo"
                                  />
                                  {`${i + 1}-${j + 1}- ` + b.title}
                                </li>
                              )
                            })}
                          </React.Fragment>
                        ) : null}
                      </ul>
                    </div>
                  ))
                : null}
            </TabPane>
            <TabPane tab="课程评论" key="2">
              {comment
                ? comment.map(v => {
                    return (
                      <div className="comment-item" key={v.id}>
                        <div className="avatar">
                          <img
                            src={
                              v.authorAvatar
                                ? `/avatar/${v.authorAvatar}`
                                : defaultAvatar
                            }
                            alt=""
                          />
                        </div>
                        <div className="content">
                          <a
                            href=""
                            className="username"
                            style={{ color: "#93999f" }}
                          >
                            {v.authorUsername}
                          </a>
                          <p>{v.content}</p>
                          <p>{v.createAt}</p>
                        </div>
                      </div>
                    )
                  })
                : null}
            </TabPane>
            <TabPane tab="用户评价" key="3">
              <div className="evaluation-info">
                <div className="evaluation-title">综合评分</div>
                <div className="evaluation-score">{average}</div>
                <Rate disabled value={average - 0} />
              </div>
              <div className="evaluate">
                <div className="your">
                  <h2>请输入您的评分</h2>
                  <Rate
                    allowHalf
                    defaultValue={0}
                    onChange={rate => this.setState({ rate: rate })}
                  />
                </div>
                <div className="evaluate-item">
                  <div className="avatar">
                    <img
                      src={loginuser ? `/avatar/${loginuser}` : defaultAvatar}
                      alt=""
                    />
                  </div>
                  <div className="your-evalute">
                    <TextArea
                      placeholder="您的总结"
                      rows={4}
                      value={this.state.summary}
                      onChange={e => this.setState({ summary: e.target.value })}
                    />
                  </div>
                </div>
                <div className="send-evaluate-p">
                  <div
                    className="send-evaluate"
                    onClick={this.handleSendRate.bind(this)}
                  >
                    发表
                  </div>
                </div>
              </div>
              {rateArray.map((v, i) => {
                return (
                  <div className="evaluation-item" key={i}>
                    <div className="avatar">
                      {
                        <img
                          src={
                            users[i]
                              ? `/avatar/${users[i].avatar}`
                              : loginuser
                                ? `/avatar/${loginuser}`
                                : defaultAvatar
                          }
                          alt=""
                        />
                      }
                    </div>
                    <div className="content">
                      <div className="top">
                        <span>
                          {users[i]
                            ? users[i].username
                            : this.props.userstatus.username}
                        </span>
                        <Rate disabled value={rate[v] - 0} />
                      </div>
                      <div className="con">
                        <p>{rateComment[v]}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
