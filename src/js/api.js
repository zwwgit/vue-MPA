
import axios from "axios";
import globalVariable from '@/js/global_variable.js'
let base = globalVariable.apiHost;

export const listSelectNews = params => { return axios.get(`${base}/info/news/listSelectNews.shtml`, { params }); };

export const addSelectNewsViews = params => { return axios.get(`${base}/info/news/addSelectNewsViews.shtml`, { params: params }); };

export const getSelectNewsListPager  = params => { return axios.get(`${base}/info/news/getSelectNewsListPager.shtml`, { params: params }); };

