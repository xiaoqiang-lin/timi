import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials=true

export function getPIN(telNum){
  return axios.get(`${BASE_URL}/api/getpin/${telNum}`)
}

export function loginBySms(params){
  return axios.post(`${BASE_URL}/api/smslogin`,params)
}
export function loginByPwd(params){
  return axios.post(`${BASE_URL}/api/pwdlogin`,params)
}
export function getUserInfo(){
  return axios.get(`${BASE_URL}/api/userinfo/`)
}