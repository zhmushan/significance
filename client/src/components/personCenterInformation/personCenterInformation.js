import React from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Radio } from 'antd'
import './PersonCenterInformation.scss'
import { changePersonMsg } from '@/redux/actions'
import CustomIcon from '@/common/customIcon/customIcon'
@connect(
  state => state,
  { changePersonMsg }
)
class PersonCenterInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmLoading: false,
      sex: '男',
      username: "",
      job: "",
      signature: "",
      city: ""
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  //点击确认
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    })
    this.props.changePersonMsg(this.state)

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 1000)
  }
  // 取消修改信息
  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false,
    })
  }

  // 表单信息
  handleChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    })
  }
  render() {
    const { visible, confirmLoading } = this.state
    const information = [
      {
        name: '昵称',
        value: this.props.userstatus.nickname ? this.props.userstatus.nickname : this.props.userstatus.username
      },
      {
        name: '职位',
        value: this.props.userstatus.job ? this.props.userstatus.job : '未设置'
      },
      {
        name: '城市',
        value: this.props.userstatus.city ? this.props.userstatus.city : '未设置'
      },
      {
        name: '性别',
        value: this.props.userstatus.sex ? this.props.userstatus.sex : '未设置'
      },
      {
        name: '个性签名',
        value: this.props.userstatus.signature ? this.props.userstatus.signature : "未设置"
      }
    ]
    const { TextArea } = Input
    const RadioGroup = Radio.Group
    return (
      <div className="person-information-container">
        <div className="title">
          <span>个人信息</span>
          <a className="edit-info" onClick={this.showModal}>
            <CustomIcon type='pen'></CustomIcon>
            编辑</a>
        </div>
        <div>
          <Modal title="编辑个人信息"
            visible={visible}
            onOk={this.handleOk}
            cancelText="取消"
            okText="确定"
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <Input placeholder="昵称" size="large" defaultValue="1" value={this.state.username} style={{ marginBottom: 20 }} onChange={this.handleChange.bind(this, 'username')} />
            <Input placeholder="职位" size="large" value={this.state.job} style={{ marginBottom: 20 }} onChange={this.handleChange.bind(this, 'job')} />
            <Input placeholder="城市" size="large" value={this.state.city} style={{ marginBottom: 20 }} onChange={this.handleChange.bind(this, 'city')} />
            <RadioGroup onChange={this.onRadioChange} value={this.state.sex} style={{ marginBottom: 20 }} onChange={this.handleChange.bind(this, 'sex')}>
              <Radio value={'男'}>男</Radio>
              <Radio value={'女'}>女</Radio>
            </RadioGroup>
            <TextArea rows={4} value={this.state.signature} placeholder="个性签名" onChange={this.handleChange.bind(this, 'signature')} />
          </Modal>
        </div>
        <div className="info-wapper">
          {
            information.map(v => {
              return (
                <div className="info-box" key={v.name}>
                  <label htmlFor="">{v.name}</label>
                  <div className="content">{v.value}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default PersonCenterInformation
