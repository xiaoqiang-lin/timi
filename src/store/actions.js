import * as types from './mutation-types'
import {getUserInfo} from 'dao/login'

const actions = {
  async getUserInfo({commit}){
    const result = await getUserInfo();
    if(result.success_code === 200){
       commit(types.SET_USER_INFO, {userInfo: result.message});
    }
  },
  syncUserInfo({commit}, userInfo){
    commit(types.SET_USER_INFO, {userInfo});
  }
}