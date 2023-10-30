import express from "express";
import dotenv from "dotenv"
import conectarDb from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";



const app = express();
app.use(express.json())
dotenv.config()
conectarDb();


//Rutas
app.use("/api/v1/usuarios", usuarioRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 4000")
})