import './Login.css'
import { useState } from 'react'
import { Input } from '../../components/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import { useNavigate } from "react-router-dom"
import {
  updateEmail,
  updatePassword,
  makeLogin
} from './Login.js'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
	  email: "",
	  password: ""
  })

  const handleEmailChange = (value) => {
    updateEmail(value, setFormData, formData)
  }

  const handlePasswordChange = (value) => {
    updatePassword(value, setFormData, formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await makeLogin(formData, navigate, setFormData)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <header>
          <h1>Inicio de sesion</h1>
        </header>
        <Input type="text" placeholder="Correo electronico" value={formData.email} setValue={handleEmailChange}></Input>
        <Input type="password" placeholder="Contraseña" value={formData.password} setValue={handlePasswordChange}></Input>
        <Button type="submit">Iniciar sesion</Button>
      </form>
    </div>
  )
}

export default Login
