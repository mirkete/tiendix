import { useState } from "react"
import { Input } from "../../components/Input.jsx"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
    makeRegister,
    handleFormChange
} from "./Register.js"

export default function Register(){

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        "shop_name": ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        await makeRegister(formData, setFormData, navigate)
    }

    const handleEmailChange = (val) => {
        handleFormChange("email", val, formData, setFormData)
    }

    const handlePasswordChange = (val) => {
        handleFormChange("password", val, formData, setFormData)
    }

    const handleShopNameChange = (val) => {
        handleFormChange("shop_name", val, formData, setFormData)
    }

    return(
        <div className="container" style={{placeContent:"center"}}>
            <form onSubmit={handleSubmit}>
                <header>
                <h1>Registrar tienda</h1>
                </header>
                <Input type="text" placeholder="Nombre de la tienda" value={formData["shop_name"]} setValue={handleShopNameChange}></Input>
                <Input type="text" placeholder="Correo electronico" value={formData.email} setValue={handleEmailChange}></Input>
                <Input type="password" placeholder="Contraseña" value={formData.password} setValue={handlePasswordChange}></Input>
                <button type='submit'>Registrarse</button>
            </form>
        </div>
    )
}