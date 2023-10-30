import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
const usuarios = (req, res) => {
    // res.send("backend usuarios")
};

const registrar = async (req, res) => {
    // Eiata registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }
    try {

        const usuario = new Usuario(req.body);
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error);
    }

}



const autenticar = (req, res) => {
    console.log("autenticandoooooo")
};



export { usuarios, registrar, autenticar }