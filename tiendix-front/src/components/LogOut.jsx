import Button from "./Button/Button.jsx"
import {useNavigate} from "react-router-dom"

export default function LogOut({style}){

    const navigate = useNavigate()

    const handleClick = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    return (
        <Button style={style} type="text" onClick={handleClick}>
            Cerrar sesion
        </Button>
    )
}