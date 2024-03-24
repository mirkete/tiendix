import "./App.css"
import { Link } from "react-router-dom"
import {useLocalStorage} from "./hooks/useLocalStorage.js"
import LogOut from "./components/LogOut.jsx"

export default function App(){
  const [shopName, setShopName] = useLocalStorage("shopName", null)

  return(
    <div className="container">
        
        {
            shopName
            ? <>
              <h1>Hola, {shopName}!</h1>
              <LogOut style={{placeSelf:"center"}}></LogOut>
            </>
            : <>
              <div className="anchors-cont">
                <Link to="/login">Iniciar sesion</Link>
                <Link to="/register">Registrarse</Link>
              </div>

              <h1>Debes registrarte o iniciar sesion</h1>
            </>
        }
    </div>
  )
}