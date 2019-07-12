import axios from 'axios';
axios.defaults.withCredentials=true
const BASE_URL = 'http://127.0.0.1:3000';


export function getCartList () {
    return axios.get(BASE_URL + '/api/cartlist');
}

export function addGoodsToCart(params){
    return axios.post(BASE_URL + '/api/addtocart',params);
}

export function delGoodsFromCart(params){
    return axios.post(BASE_URL+'/api/delcartgoods',params)
}
export function editGoodsInCart(params){
    return axios.post(BASE_URL+'/api/editcartgoods',params)
}
export function checkAllGoodsInCart(params){
    return axios.post(BASE_URL+'/api/checkallgoods',params)
}