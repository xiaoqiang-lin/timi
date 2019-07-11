import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

export function getSearchPageData(){
  return axios.get(BASE_URL + '/api/searchgoods')
}