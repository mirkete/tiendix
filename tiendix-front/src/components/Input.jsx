export function Input({type, placeholder, value, setValue}){

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return(
        <input type={type} minLength="5" value={value} 
        placeholder={placeholder} onChange={handleChange}/>
    )
}