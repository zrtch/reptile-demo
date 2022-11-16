import React ,{Component} from 'react'
import './style.css'
import { Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

class Home extends Component{
  state = {
    loaded: false,
    isLogin: true
  }
  componentDidMount(): void {
    axios.get('api/isLogin').then((res)=>{
      if(!res.data?.data){
        this.setState({
          isLogin: false,
          loaded:true 
        })
      }else{
        this.setState({
          loaded:true 
        })
      }
    })
  }

  handleLogoutClick = () => {
    axios.get('api/logout').then((res)=>{
      if(res.data?.data){
        this.setState({
          isLogin: false
        })
      }else{
        message.error('退出失败')
      }
    })
  }

  render(){
    const { isLogin,loaded } = this.state;
    if(isLogin){
      if(loaded){
        return (
          <div className='home-page'>
            <Button type="primary">爬取</Button>
            <Button type="primary">展示</Button>
            <Button type="primary" onClick={this.handleLogoutClick}>退出</Button>
          </div>
        )
      }
      return null
    }
    return <Redirect to="login" />

  }

}

export default Home