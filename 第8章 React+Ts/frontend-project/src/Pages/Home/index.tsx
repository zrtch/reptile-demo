import React ,{Component} from 'react'
import './style.css'
import { Button, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'
interface CourseItem {
  title:string;
  count:number 
}
interface State {
  loaded:Boolean;
  isLogin:Boolean;
  data:{
     [key: string]:CourseItem[]
  }
}

class Home extends Component{
  state: State = {
    loaded: false,
    isLogin: true,
    data:{}
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
    });

    axios.get('api/showData').then((res)=>{
      if(res.data?.data){
        console.log(res.data.data)
        this.setState({
          data: res.data.data
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
    const { data } = this.state
    const courseName: string[] = []
    const times: string[] = []
    const result: any[] = []
    const tempData:{
      [key:string]: number[]
    } = {}
    for(let i in data){
      const item = data[i]
      times.push(moment(Number(i)).format('MM-DD HH:mm'))
      item.forEach(innerItem=>{
        const { title,count } = innerItem
        if(courseName.indexOf(innerItem.title) === -1){
          courseName.push(title)
        }
        tempData[title] ? tempData[title].push(count): (tempData[title] = [count])
      })
      for(let i in tempData){
        result.push({
          name:i,
          data:tempData[i],
          type: 'line',
        })
      }
    }
    return{
        title: {
          text: '课程在线学习'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: courseName
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times
        },
        yAxis: {
          type: 'value'
        },
        series: result
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