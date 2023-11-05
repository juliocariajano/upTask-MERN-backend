import nodemailer from "nodemailer";


export const emailRegistro = async (datos) => {

    const { email, nombre, token } = datos

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "38d0ec33ddf693",
            pass: "32098e9722096d"
        }
    });



    //   Informacion del email
    const info = await transport.sendMail({
        from: '"Gestor de Tareas" <cuentas@gestorTareas.com>',
        to: email,
        subject: "Comprueba tu cuenta en Gestor de Taras",
        text: "Comprueba tu cuenta",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta</p>
    <p> Tu cuenta ya casi esta lista, solo debes comprobar en el siguiente enlace:</p>
    
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar cuenta</a>   
    <p> Si tu no creaste esta cuenta puedes ignorar este enlace:</p>

    `
    })




}