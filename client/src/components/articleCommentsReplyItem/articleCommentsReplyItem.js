import React, { Component } from 'react'

class ArticleCommentsReplyItem extends Component {
  render() {
    const { floor, content, from, to, time } = this.props
    return (
      <div className="forum-reply-item">
        <div className="forum-reply-user-avatar">
          <a>
            <img src={'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'} alt=""/>
          </a>
        </div>
        <div className="forum-reply-user-details">
          <div className="forum-reply-user-name">
            <a>{from}</a>
            <span>#{floor + 1}</span>
          </div>
          <div className="forum-reply-user-content">
            {content}
          </div>
          <div className="forum-reply-operation">
            <div className="forum-reply-operation-left">
              <a className="forum-reply-btn">
                回复
              </a>
              <a className="forum-reply-report">
                举报
              </a>
            </div>
            <div className="forum-reply-operation-right">
              <span>
                {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleCommentsReplyItem