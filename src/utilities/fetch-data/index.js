import Taro from '@tarojs/taro'
import buildUrl from 'build-url'

async function fetchData({
  resource = '',
  page = '',
  pageSize = '',
  success = () => {},
  fail = () => {}
}){
  const queryParams = {}

  if(page) queryParams._page = page
  if(pageSize) queryParams._limit = pageSize

  const url = buildUrl(API_WS,{
    path:resource,
    queryParams
  })

  try {
    const response = await Taro.request({
      url
    })

    const {statusCode} = response

    switch (statusCode){
      case 200:
        success(response)
        break;
      default:
        throw new Error('出问题了！')
        break;
    }


  } catch(error){
    fail(error)
  }
}

export default fetchData