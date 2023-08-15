import { message } from 'antd';
import axios from 'axios';
import queryString from 'query-string';

const getQueryString = (query: object) => {
    const result = queryString.stringify(query);

    if (!result) return "";
    return `?${result}`;
}

interface IRequest {
    method: "GET" | "POST";
    path?: string;
    data?: object;
    query?: object;
    newUrl?: string;
    headers?: {
        authorization?: string
    };
}

function send({
    method,
    path,
    data,
    query = {},
    headers = {},
    newUrl
}: IRequest) {
    return new Promise((resolve) => {
        let url = (newUrl ? newUrl : process.env.REACT_APP_API_URL) + `${path}${getQueryString(query || {})}`
        if (newUrl) {
            url = `${newUrl}${getQueryString(query || {})}`
        }
        const dataString = window.localStorage.getItem('data');
        if(dataString) {
            const newData = JSON.parse(dataString);
            headers.authorization = `Bearer ${newData.token}`
        }
        axios({
            method, url, data, headers,
        })
        
    })
}
