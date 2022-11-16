import React ,{Component} from 'react'
import './style.css'
import { Button, message } from 'antd';
import ReactECharts from 'echarts-for-react';
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

  handleCrowlerClick = () =>{
    axios.get('api/getData').then((res)=>{
      if(res.data?.data){
        message.success('爬取成功！')
      }else{
        message.error('爬取成功！')
      }
    })
  }

  // 引入第三方库发现定义文件有问题可以通过这样的方式进行解决
  getOption:() => echarts.EChartsOption = () => {
    return{
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
  }

  render(){
    const { isLogin,loaded } = this.state;
    if(isLogin){
      if(loaded){
        return (
          <div className='home-page'>
            <div className='buttons'>
              <Button type="primary" style={{marginRight:'25px'}} onClick={this.handleCrowlerClick}>爬取</Button>
              <Button type="primary" onClick={this.handleLogoutClick}>退出</Button>
            </div>
            <ReactECharts option={this.getOption()} />
          </div>
        )
      }
      return null
    }
    return <Redirect to="login" />

  }

}

export default Home