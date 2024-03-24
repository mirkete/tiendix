export function cors(){
    return (req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*")
        res.set("Access-Control-Allow-Headers", "*")
        res.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
        next()
    }
}