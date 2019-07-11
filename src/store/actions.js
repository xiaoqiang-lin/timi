import * as types from './mutation-types'
import {getUserInfo,logout} from 'dao/login'

export default{
  async fetchUserInfo({commit}){
    const result = await getUserInfo();
      if(result.data.success_code === 200){
         commit(types.SET_USER_INFO, {userInfo:result.data.message});
      }
  },
  syncUserInfo ({commit},userInfo){
    console.log('这是syncUserInfo里面看到的userInfo')
    console.log(userInfo)
    commit(types.SET_USER_INFO,userInfo);
  },
  async signOut({commit}){
    const result = await logout();
    if(result.data.success_code === 200){
      commit(types.CLEAR_USER_INFO);
    }
  }
}
