import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO] (state,userInfo){
    state.userInfo = userInfo;
  },
  [types.CLEAR_USER_INFO](state){
    state.userInfo={}
  },
  [types.SET_LOGIN_STATE](state,bool){
    state.isLogin = bool
  },
  [types.SET_CART_LIST](state,list){
    state.cartList = list
  },
  [types.ADD_TO_CART](state,item){
    let flag = 0;
    for(let i=0;i<state.cartList.length;i++){
      if(state.cartList[i].goods_id === item.goods_id){
        flag = 1;
        state.cartList[i].goods_num =  state.cartList[i].goods_num + 1;
      }
    }
    if(!flag){
      state.cartList.push(item)
    }
  },
  [types.DEL_CART_GOODS](state,index){
    state.cartList.splice(index,1)
  }
}


export default mutations;