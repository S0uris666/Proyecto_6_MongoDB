//middleware entre la peticion  y la ruta
const jwt = require("jsonwebtoken");
//middleware de autenticacion
module.exports= (req, res, next) => { //funcion anonima
let { authorization } = req.headers;
if (!authorization) return res.status(401).json({ message: "Acceso no autorizado" });

try {
    let [type, token] = authorization.split(" ");
    if (type === 'token' || type === 'Bearer'){
        const openToken = jwt.verify(token, process.env.SECRET);
        console.log(openToken);
        req.user = openToken;
        next();
    }
    else{
        return res.status(401).json({ message: "Acceso no autorizado" });
    }
} catch (error) {
    return res.status(401).json({ message: "Acceso no autorizado" });
}

}

