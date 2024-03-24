import { useState } from 'react'
import './App.css'
import { Input } from './components/Input.jsx'
import { ReactUsersRepository } from '../context/Users/Infrastructure/ReactUsersRepository.js'
import { logUser } from "../context/Users/Application/index.js"

function App() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleEmailChange = (value) => {
    setFormData({
      ...formData,
      email: value
    })
  }

  const handlePasswordChange = (value) => {
    setFormData({
      ...formData,
      password: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await logUser(ReactUsersRepository, formData)

    setFormData({
      email: "",
      password: ""
    })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <header>
          <h1>Inicio de sesion</h1>
        </header>
        <Input type="text" placeholder="Correo electronico" value={formData.email} setValue={handleEmailChange}></Input>
        <Input type="password" placeholder="Contraseña" value={formData.password} setValue={handlePasswordChange}></Input>
        <button type='submit'>Iniciar sesion</button>
      </form>
    </div>
  )
}

export default App
