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
        await waiting(0);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody =<T>(response : AxiosResponse <T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Users = {
    list: () => requests.get<User[]>('/user'),
    details: (id: string) => requests.get<User>(`/user/${id}`),
    create: (user: User) => requests.post<void>('/user',user),
    update: (user: User) => requests.put<void>('/user', user),
    delete: (id: string) => requests.del<void>(`/user/${id}`)
}
const Clients = {
    list: () => requests.get<Client[]>('/client'),
    details: (id: string) => requests.get<Client>(`/client/${id}`),
    create: (client: Client) => requests.post<void>('/client',client),
    update: (client: Client) => requests.put<void>('/client', client),
    delete: (id: string) => requests.del<void>(`/client/${id}`)
}
const requestAgent = {
    Users,
    Clients
}

export default requestAgent;