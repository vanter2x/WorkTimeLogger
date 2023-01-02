import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:7156/api";

const responseBody = (response : AxiosResponse) => response.data;

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.get(url,body).then(responseBody),
    put: (url: string, body: {}) => axios.get(url,body).then(responseBody),
    del: (url: string) => axios.get(url).then(responseBody),
}

const Users = {
    list: () => request.get('/user')
}
const Clients = {
    list: () => request.get('/client')
}
const requestAgent = {
    Users,
    Clients
}

export default requestAgent;