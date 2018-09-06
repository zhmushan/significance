import React, { Component } from 'react'
import { connect } from 'react-redux'
import { defaultAvatar } from '@/const'

import './forumPersonal.scss'

@connect(
  state => state.userstatus,
  null
)
class ForumPersonal extends Component {
  render() {
    return (
      <div className="forum-personal-user-info">
        <div className="forum-personal-user-info-top">
          <img src={this.props.avatar ? `/avatar/${this.props.avatar}` : defaultAvatar} alt=""/>
          <div className="forum-personal-user-info-data">
            <span style={{color: '#14191e'}}>{this.props.username}</span>
            <span style={{fontSize: 12, color: '#787d82'}}>积分: 0</span>
          </div>
        </div>
        <div className="forum-personal-user-info-bottom">
          <a>提问</a>
          <a>回答</a>
          <a>关注</a>
        </div>
      </div>
    )
  }
}

export default ForumPersonal