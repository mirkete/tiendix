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

        const token = await response.text()
        window.localStorage.setItem("token", token)
    }
}