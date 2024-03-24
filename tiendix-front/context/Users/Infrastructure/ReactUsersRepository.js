import { UsersRepository } from "../Domain/UsersRepository.js";
import { API_URL } from "../../../src/utils/constants.js"

export class ReactUsersRepository extends UsersRepository{
    static logUser = async (userCredentials) => {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCredentials)
            })
            .then((res) => {
                if(!res.ok){
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(({token, shopName}) => {
                window.localStorage.setItem("token", token)
                window.localStorage.setItem("shopName", shopName)
                resolve()
            })
            .catch((err) => {
              reject(err)  
            })
        })
    }

    static registerUser = async (userData) => {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then((res) => {
                if(!res.ok){
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(({token, shopName}) => {
                window.localStorage.setItem("token", token)
                window.localStorage.setItem("shopName", shopName)
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}