import { LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import qs from 'qs'
import { Button, Form, Input, message } from 'antd'
import React, { Component } from 'react'
import './style.css'
import { Redirect } from 'react-router-dom'

class App extends Component {
  state = {
    isLogin: false
  }
  onFinish = (values: any) => {
    axios.post(
      '/api/login',
      qs.stringify({
        password: values.password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    ).then((res)=>{
      console.log(res);
      if(res.data?.data){
        this.setState({
          isLogin: true
        })
      }else{
        message.error('登录失败')
      }
    })
  }
  render(){
    const { isLogin } = this.state
    return isLogin ? <Redirect to="/"/> : (
      <div className="content">
        <div className="title">Your React</div>
        <div className="login-page">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入登录密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default App
