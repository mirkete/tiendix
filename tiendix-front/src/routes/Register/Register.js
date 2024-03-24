import { ReactUsersRepository } from "../../../context/Users/Infrastructure/ReactUsersRepository";
import {registerUser} from "../../../context/Users/Application/index.js"

export async function makeRegister(data, setFormData, navigate){
    registerUser(ReactUsersRepository, data)
    .then(() => navigate("/"))
    .catch(() => {
        alert("Las credenciales son invalidas. Compruebelas e intente nuevamente")
        setFormData({email: "", password: "", shop_name: ""})
    })
}

export async function handleFormChange(key, value, formData, setFormData){
    const newData = {...formData}
    newData[key] = value

    setFormData(newData)
}