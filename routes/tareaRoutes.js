import express from "express"
import { cambiarEstado, obtenerTarea, agregarTarea, actualizarTarea, eliminarTarea } from "../controllers/tareaController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = express.Router()

router.post("/", checkAuth, agregarTarea)


router
    .route("/:id")
    .get(checkAuth, obtenerTarea)
    // .get(obtenerProyecto)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea)


router.post("/estado/:id", checkAuth, cambiarEstado)

export default router
