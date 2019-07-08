import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';


export function getSwipeImgs () {
    return axios.get(BASE_URL + '/api/carouselimgs');
}

export function getBannerNavData(){
	return axios.get(BASE_URL + '/api/bannernav');
}

export function getShopListData(){
	return axios.get(BASE_URL + '/api/homegoods');
}
