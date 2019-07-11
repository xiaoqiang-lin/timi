import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO] (state,userInfo){
    console.log('这是来自mutationa的userInfo')
    console.log(userInfo)
    state.userInfo = userInfo;
    console.log('这是全局')
    console.log(state.userInfo)
  },
  [types.CLEAR_USER_INFO](state){
    state.userInfo={}
  },
  [types.SET_LOGIN_STATE](state,bool){
    state.isLogin = bool
  }
}

export default mutations;