import axios from 'axios';
axios.defaults.withCredentials=true
const BASE_URL = 'http://127.0.0.1:3000';


export function getCartList () {
    return axios.get(BASE_URL + '/api/cartlist');
}

export function addGoodsToCart(params){
    return axios.post(BASE_URL + '/api/addtocart',params);
}