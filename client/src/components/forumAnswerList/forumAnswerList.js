import React, { Component } from 'react'
import { Tabs } from 'antd'

import './forumAnswerList.scss'

const TabPane = Tabs.TabPane

class ForumAnswerList extends Component {
  callback(key) {
    console.log(key)
  }

  render() {
    const answerItem = answer.map((item, index) => {
      let rankingColor;
      switch (index) {
        case 0:
          rankingColor = '#f8b551'
          break
        case 1:
          rankingColor = '#787d82'
          break
        case 2:
          rankingColor = '#ec6941'
          break
        default:
          rankingColor = '#b5b9bc'
          break
      }
      return (
        <li key={index}>
          <div className="answer-list-item-left">
            <span className="answer-ranking" style={{color: rankingColor}}>{index + 1}</span>
            <img src={require(`@/assets/imgs/${item.avatar}.jpg`)} alt=""/>
          </div>
          <div className="answer-list-item-right">
            <div className="answer-name">
              <a>
                {item.username}
              </a>
            </div>
            <div className="answer-count">
              {item.answerCount}回答
            </div>
          </div>
        </li>
      )
    })
    return (
      <div className="forum-answer-list">
        <span className="forum-answer-list-title">回答雷锋榜</span>
        <Tabs defaultActiveKey="1" 
          onChange={this.callback}
          tabBarGutter={14}
        >
          <TabPane tab="本周" key="1">
            <ul>
              {answerItem}
            </ul>
          </TabPane>
          <TabPane tab="总榜" key="2">
          
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const answer = [
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' },
  { username: '该用户已成仙', answerCount: '10', avatar: 'user-avator' }
]

export default ForumAnswerList