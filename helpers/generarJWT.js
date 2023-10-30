import Jwt from "jsonwebtoken";


const generarJWT = (id) => {
    return Jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
};

export default generarJWT;