import * as types from './mutation-types'
import {getUserInfo,logout} from 'dao/login'
import {getCartList,addGoodsToCart,delGoodsFromCart,editGoodsInCart,checkAllGoodsInCart} from 'dao/cart'
export default{
  async fetchUserInfo({commit}){
    const result = await getUserInfo();
      if(result.data.success_code === 200){
         commit(types.SET_USER_INFO, {userInfo:result.data.message});
      }
  },
  syncUserInfo ({commit},userInfo){
    commit(types.SET_USER_INFO,userInfo);
  },
  async signOut({commit}){
    const result = await logout();
    if(result.data.success_code === 200){
      commit(types.CLEAR_USER_INFO);
    }
  },
  async fetchCartList({commit}){
    const result = await getCartList();
    if(result.data.success_code === 200){
      commit(types.SET_CART_LIST, {userInfo:result.data.message});
    }
  },
  async addCartGoods({commit},item){
    const result = await addGoodsToCart(item)
    if(result.data.success_code === 200){
      commit(types.ADD_TO_CART, result.data.message);
    }
  },
  async delCartGoods({commit},item){
    const result = await delGoodsFromCart(item)
    if(result.data.success_code == 200){
      return;
    }
  },
  async editCartGoods({commit},item){
    const result = await editGoodsInCart(item)
    if(result.data.success_code ==200){
      console.log(result)
      console.log('数据编辑成功')
    }
  },
  async checkAllCartGoods({commit},flag){
    const result = await checkAllGoodsInCart(flag)
    if(result.data.success_code ==200){
      console.log(result)
      console.log('数据编辑成功')
    }
  }
}
