import React from 'react'
import { Link } from 'react-router-dom'
import CustomIcon from '@/common/customIcon/customIcon'
import { connect } from 'react-redux'
import { logout } from '@/redux/actions'
import Cookies from 'js-cookie'
import { defaultAvatar } from '@/const'
import './userStatus.scss'
@connect((state) => state.userstatus, { logout })
class UserStatus extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLogin: Cookies.get('_id') ? true : false,
			isUserInfoShow: false,
			_id: Cookies.get('_id'),
		}
	}
	//  鼠标移到头像显示用户板块
	toggleHover() {
		if (this.state.isLogin) {
			this.setState({
				isUserInfoShow: !this.state.isUserInfoShow,
			})
		}
	}
	// 注销用户的登录状态
	logout() {
		this.setState({
			isLogin: false,
			isUserInfoShow: false,
		})
		this.props.logout()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.shoppingcart.length !== this.props.shoppingcart) {
			this.props.stateChange('shoppingCartCount', nextProps.shoppingcart.length)
		}
	}

	render() {
		const nickname = this.props.nickname ? this.props.nickname : this.props.username
		const linkStyle = this.state.isUserInfoShow ? { border: '2px solid #f01414' } : { border: 'none' }
		const loginUser = this.state._id
		return (
			<div className='userStatus' onMouseEnter={() => this.toggleHover()} onMouseLeave={() => this.toggleHover()}>
				{this.state.isLogin ? (
					<React.Fragment>
						<a className='nav-user-avator'>
							<img
								style={linkStyle}
								src={this.props.avatar ? `/avatar/${this.props.avatar}` : `${defaultAvatar}`}
								alt='user-avator'
							/>
						</a>
						{this.state.isUserInfoShow ? (
							<div className='user-info-wrapper'>
								<div className='user-info-top'>
									<a href='#javascript'>
										<img
											src={this.props.avatar ? `/avatar/${this.props.avatar}` : `${defaultAvatar}`}
											alt='user-avator'
										/>
									</a>
									<div className='user-info-data'>
										<div className='user-info-name'>
											<Link to={`../personCenter/${loginUser}`}>{nickname}</Link>
										</div>
										<div className='user-info-assets'>
											<a href='#javascript'>
												<span className='user-info-integral'>
													积分{this.props.integral ? parseInt(this.props.integral, 10) : 0}
												</span>
											</a>
										</div>
									</div>
								</div>
								<div className='user-info-center'>
									<ul>
										<li>
											<a href={`/personCenter/${this.state._id}/class`}>我的课程</a>
										</li>
										<li>
											<a href={`/personCenter/${this.state._id}/yuanwen`}>我的问答</a>
										</li>
										<li>
											<a href={`/personCenter/${this.state._id}/article`}>我的文章</a>
										</li>
										<li>
											<a href={`/personCenter/${this.state._id}/set`}>个人设置</a>
										</li>
									</ul>
								</div>
								<div className='user-info-logout'>
									<a className='user-info-logout-btn' href='#javascript' onClick={() => this.logout()}>
										安全退出
									</a>
								</div>
							</div>
						) : (
							''
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						<Link to='/login' className='nav-login-btn'>
							登录
						</Link>
						/
						<Link to='/login' className='nav-register-btn'>
							注册
						</Link>
					</React.Fragment>
				)}
			</div>
		)
	}
}

export default UserStatus
