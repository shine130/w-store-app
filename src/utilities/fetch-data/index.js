import Taro from '@tarojs/taro'
import buildUrl from 'build-url'

async function fetchData({
  resource = '',
  search='',
  page = '',
  pageSize = '',
  success = () => {},
  fail = () => {},
  complete = () => {}
}){
  const queryParams = {}

  if(search) queryParams.q = search
  if(page) queryParams._page = page
  if(pageSize) queryParams._limit = pageSize

  const url = buildUrl(API_WS,{
    path:resource,
    queryParams
  })

  try {
    const response = await Taro.request({
      url,
      fail(error){
        error.message = '服务出现问题,请稍后再试。'
        fail(error)
      }
    })

    const {statusCode} = response

    switch (statusCode){
      case 200:
        success(response)
        break;
      default:
        throw new Error('服务出现问题,请稍后再试。')
        break;
    }


  } catch(error){
    fail(error)
  }
  complete()
}

export default fetchData