interface Result {
  success: Boolean;
  errMsg?: string;
  data:any;
}

//帮助我们返回符合Result接口数据
export const getResponseData = (data: any,errMsg?: string):Result =>{
  if(errMsg){
    return{
      success: false,
      errMsg,
      data
    }
  }
  return{
    success: true,
    data
  }
}