import express from "express"
import { obtenerProyectos, obtenerProyecto, nuevoProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador, obtenerTareas } from "./../controllers/proyectoController"
import checkAuth from "../middleware/checkAuth"

const router = express.router()


router
    .router("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)


router
    .route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)


router.get("/tareas/:id", checkAuth, obtenerTareas)
router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador)
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador)

export default router
