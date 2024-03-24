import "./Button.css"

export default function Button({children, onClick, style, type}){
    return(
        <button type={type} style={style} onClick={onClick}>
            {children}
        </button>
    )
}