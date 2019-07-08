import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:1688';

export function getRecommendData(){
  return axios.get(BASE_URL + '/api/recommend')
}
