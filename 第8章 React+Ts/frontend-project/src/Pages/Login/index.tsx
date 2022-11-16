import { LockOutlined } from '@ant-design/icons';
import { Button , Form, Input } from 'antd';
import React from 'react';
import './login.css'

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className='content'>
    <div className='title'>Your React</div>
    <div className='login-page'>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
        <Button type="primary" htmlType="submit" >
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>

    
  );
};

export default App;