import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import conectarDb from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectosRoutes from "./routes/proyectoRoutes.js";
import tareasRoutes from "./routes/tareaRoutes.js";



const app = express();
app.use(cors())

app.use(express.json())
dotenv.config()
conectarDb();

// configurando los cors
const whiteList = [process.env.FRONTEND_URL];
// const whiteList = ["http://localhost:5173"];


const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true)

        } else {
            callback(new Error("Error de Cors"))
        }
    }
}


// console.log(corsOptions.origin, "coorsss")

//Rutas
app.use("/api/v1/usuarios", usuarioRoutes);
app.use("/api/v1/proyectos", proyectosRoutes);
app.use("/api/v1/tareas", tareasRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 4000")
})