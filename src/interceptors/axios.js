import axios from "axios";

axios.interceptors.response.use(resp => resp, async error => {
    let response = null;
    if (error.response.status === 401){
        response = await axios.post('http://localhost:8080/api/refresh', {}, {withCredentials:true});
    }

    if (response.status ===200){
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`
        return axios(error.config);
    }

    return error;
});
