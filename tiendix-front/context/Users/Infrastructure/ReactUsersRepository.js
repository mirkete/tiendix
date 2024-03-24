import { UsersRepository } from "../Domain/UsersRepository.js";
import { API_URL } from "../../../src/utils/constants.js"

export class ReactUsersRepository extends UsersRepository{
    static logUser = async (userCredentials) => {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCredentials)
        })

        const {token, shopName} = await response.json()
        window.localStorage.setItem("token", token)
        window.localStorage.setItem("shopName", shopName)
    }

    static registerUser = async (userData) => {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const {token, shopName} = await response.json()
        window.localStorage.setItem("token", token)
        window.localStorage.setItem("shopName", shopName)
    }
}