import axios from 'axios';

const api = axios.create({
    baseURL: ' https://economia.awesomeapi.com.br/last'
});

export default api;