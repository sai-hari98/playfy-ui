import axios from 'axios';

const playfyAxios = axios.create({
    baseURL : "http://localhost:8080"
});

playfyAxios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    if(error.response.status == 401 || error.response.status == 403){
        window.location.href = "/login";
    }else{
        Promise.reject(error);
    }
});

export default playfyAxios;