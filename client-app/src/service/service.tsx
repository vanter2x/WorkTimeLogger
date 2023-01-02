import axios from "axios";
import { useState } from "react";
import { Client } from "../app/models/client";
import { User } from "../app/models/user";

export function GetClient() {
    let [respons, setResponse] = useState<Client[]>([]);

    axios.get<Client[]>('https://localhost:7156/api/client')
        .then((response) => {
            setResponse(response.data);
        })
    return respons;
}

export function GetUsers(url: string) {
    let [respons, setResponse] = useState<User[]>([]);

    axios.get<User[]>('https://localhost:7156/api/user')
        .then((response) => {
            setResponse(response.data);
        })
    return respons;
}