import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

export function getRecommendData(page,count){
  return axios.get(`${BASE_URL}/api/recommend?page=${page}&count=${count}`)
}
