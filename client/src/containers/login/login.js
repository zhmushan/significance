import React from 'react'
import './login.scss'
import axios from 'axios'
import Cookies from 'js-cookie'
import { login, removeMsg, register, forgetPassword, RegisterSendEamil, checkedCaptcha } from '@/redux/actions.js'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loading from '@/common/loading/loading'
import { message } from 'antd'
import SendEmail from '../../components/sendEmail/sendEmail'
import Register from '../../components/register/register'
@connect((state) => state, {
	login,
	removeMsg,
	register,
	forgetPassword,
	RegisterSendEamil,
	checkedCaptcha,
})
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			re_username: '',
			re_password: '',
			repet_password: '',
			forget_email: '',
			captcha: '',
			show: false,
			email: '',
			isSec: '',
			loading: false,
		}
		this.registerSendEamil = this.registerSendEamil.bind(this)
	}

	// 表单信息
	handleChange = (key, event) => {
		this.setState({
			[key]: event.target.value,
		})
	}
	// 登录
	login = async () => {
		await this.props.login(this.state.username, this.state.password)
		if (this.props.userstatus.code === 0) {
			message.warn(this.props.userstatus.msg)
		}
		this.timer = null
	}
	// 注册
	register = async () => {
		await this.props.register(this.state.re_username, this.state.re_password, this.state.repet_password)
		if (this.props.userstatus.code === 0) {
			message.warn(this.props.userstatus.msg)
		}
		this.timer = null
	}

	async registerSendEamil() {
		await this.setState({
			loading: true,
		})

		await this.props.RegisterSendEamil(this.state.email)
		if (this.props.userstatus.code === 1) {
			this.setState({
				isSec: true,
				loading: false,
			})
			// setTimeout(() => {
			// 	this.setState({
			// 		isSec: false,
			// 	})
			// }, 1000 * 60)
		} else {
			this.setState({
				isSec: false,
				loading: false,
			})
			message.warn(this.props.userstatus.msg)
		}
	}
	// 跳转到注册取完善信息
	goToNextRegister = async () => {
		const email = this.state.email
		var regex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

		if (!email) {
			message.warn('请输入邮箱')
		} else if (!regex.test(email)) {
			message.warn('邮箱格式错误')
		} else {
			const res = await axios({
				method: 'post',
				url: `/api/users/email/validate/${email}`,
				headers: {
					captcha: this.state.captcha,
				},
			})
			if (res.data.code === 1) {
				Cookies.set('captcha', this.state.captcha)
				this.setState({
					show: !this.state.show,
				})
			} else {
				message.warn('验证码错误')
			}
		}
	}

	classCal = (dom, what, className) => {
		switch (what) {
			case 'add':
				dom.classList.add(className)
				break
			case 'remove':
				dom.classList.remove(className)
				break
			default:
				break
		}
	}

	inputFocus = (e) => {
		const inputNow = e.target
		const go = this.refs.go
		inputNow.parentNode.classList.add('focus')
		inputNow.parentNode.classList.remove('shake')
		go.classList.remove('active')
	}

	inputBlur = (e) => {
		const inputNow = e.target
		if (!inputNow.value) {
			inputNow.parentNode.classList.remove('focus')
		} else {
			inputNow.parentNode.classList.add('focus')
		}
	}
	// 切换到注册
	changeRegister = (e) => {
		e.preventDefault()
		const formBox = this.formBox
		formBox.classList.remove('level-reg-revers')
		if (formBox.classList.contains('level-login')) {
			this.classCal(formBox, 'remove', 'level-login')
		} else {
			this.classCal(formBox, 'add', 'level-login')
		}
		if (formBox.classList.contains('level-reg')) {
			this.classCal(formBox, 'remove', 'level-reg')
		} else {
			this.classCal(formBox, 'add', 'level-reg')
		}
		if (!formBox.classList.contains('level-reg')) {
			this.classCal(formBox, 'add', 'level-reg-revers')
		}
	}
	//忘记密码?
	forgetPass = (e) => {
		e.preventDefault()
		const formBox = this.formBox
		this.classCal(formBox, 'add', 'level-forget')
		this.classCal(formBox, 'remove', 'level-reg')
	}

	handleBack = (e) => {
		e.preventDefault()
		const formBox = this.formBox
		this.classCal(formBox, 'remove', 'level-forget')
		this.classCal(formBox, 'add', 'level-login')
	}
	handleToZero() {
		this.setState({
			isSec: false,
		})
	}

	render() {
		return (
			<div className='login-container'>
				{this.props.userstatus.redirectTo && this.props.userstatus.redirectTo !== '/login' ? (
					<Redirect to={this.props.userstatus.redirectTo} />
				) : null}
				<div className='formBox level-login' ref={(div) => (this.formBox = div)}>
					<div className='box boxShaddow' />
					<div className='box loginBox'>
						<h2>登录</h2>
						<form className='form'>
							<div className='f_row'>
								<label>用户名</label>
								<input
									type='text'
									className='input-field'
									value={this.state.username}
									onChange={this.handleChange.bind(this, 'username')}
									onFocus={this.inputFocus}
									onBlur={this.inputBlur}
									required
								/>
								<u />
							</div>
							<div className='f_row last'>
								<label>密码</label>
								<input
									type='password'
									className='input-field'
									onFocus={this.inputFocus}
									onBlur={this.inputBlur}
									onChange={this.handleChange.bind(this, 'password')}
									required
								/>
								<u />
							</div>
							<button type='button' className='btn' ref='go' onClick={this.login}>
								<span>GO</span> <u />
								<svg version='1.1' x='0px' y='0px' viewBox='0 0 415.582 415.582'>
									<path d='M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
                        c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
                        c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
                        C415.582,102.628,414.103,99.059,411.47,96.426z' />
								</svg>
							</button>
							<div className='f_link'>
								{/* <a href="" className="resetTag" onClick={this.forgetPass}>
									忘记密码?
								</a> */}
							</div>
						</form>
					</div>
					<div className='box forgetbox'>
						<a href='' className='back icon-back' onClick={this.handleBack}>
							<svg version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 199.404 199.404'>
								<polygon points='199.404,81.529 74.742,81.529 127.987,28.285 99.701,0 0,99.702 99.701,199.404 127.987,171.119 74.742,117.876 199.404,117.876 ' />
							</svg>
						</a>
						<h2>重置密码</h2>
						<form className='form'>
							<div className='f_row last'>
								<label>请输入邮箱</label>
								<input
									type='text'
									className='input-field'
									value={this.state.forget_email}
									onFocus={this.inputFocus}
									onBlur={this.inputBlur}
									onChange={this.handleChange.bind(this, 'forget_email')}
								/>
								<u />
							</div>
							<div className='f_row'>
								<label>验证码</label>
								<input
									type='text'
									className='input-field'
									value={this.state.captcha}
									onFocus={this.inputFocus}
									onBlur={this.inputBlur}
									onChange={this.handleChange.bind(this, 'captcha')}
								/>
								<u />
							</div>
							<button type='button' className='btn' onClick={this.resetPass}>
								<span>重置密码</span>
								<u />
								<svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 415.582 415.582'>
									<path d='M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
                      c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
                      c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
                      C415.582,102.628,414.103,99.059,411.47,96.426z' />
								</svg>
							</button>
						</form>
					</div>
					<div className='box registerBox'>
						<span className='reg_bg' />
						<h2>注册</h2>
						<form className='form'>
							{this.state.show ? (
								<Register
									re_password={this.state.re_password}
									repet_password={this.state.repet_password}
									inputFocus={this.inputFocus}
									inputBlur={this.inputBlur}
									register={this.register}
									handleChange={this.handleChange}
								/>
							) : (
								<SendEmail
									email={this.state.email}
									inputFocus={this.inputFocus}
									inputBlur={this.inputBlur}
									handleChange={this.handleChange}
									registerSendEamil={this.registerSendEamil}
									captcha={this.state.captcha}
									re_username={this.state.re_username}
									goToNextRegister={this.goToNextRegister}
									isSec={this.state.isSec}
									isToZero={this.handleToZero.bind(this)}
								/>
							)}
						</form>
					</div>
					<a href='' className='regTag icon-add' onClick={this.changeRegister}>
						<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 357 357'>
							<path d='M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z' />
						</svg>
					</a>
				</div>
				{this.state.loading ? <Loading /> : null}
			</div>
		)
	}
}
export default Login
