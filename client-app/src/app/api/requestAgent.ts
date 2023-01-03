import axios, { AxiosResponse } from "axios";
import { Client } from "../models/client";
import { User } from "../models/user";

const waiting = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "https://localhost:7156/api";

axios.interceptors.response.use(async response => {
    try {
        await waiting(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody =<T>(response : AxiosResponse <T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Users = {
    list: () => request.get<User[]>('/user')
}
const Clients = {
    list: () => request.get<Client[]>('/client')
}
const requestAgent = {
    Users,
    Clients
}

export default requestAgent;