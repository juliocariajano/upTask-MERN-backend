import Tarea from "../models/Tareas.js";
import Proyecto from "../models/Proyectos.js";


const agregarTarea = async (req, res) => {

    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto)

    if (!existeProyecto) {
        const error = new Error("El proyecto no existe")
        return res.status(404).json({ msg: error.message })
    }

    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tines los permisos para agregar tareas en este proyecto")
        return res.status(404).json({ msg: error.message })
    }

    try {

        const tareaAlmacenada = await Tarea.create(req.body)
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
    console.log(existeProyecto)
    // const proyec = new Proyecto(req.body);

    // proyecto.creador = req.usuario._id
    // try {
    //     const proyectoAlmacenado = await proyecto.save()
    //     res.json(proyectoAlmacenado)
    // } catch (error) {
    //     console.error(error)
    // }

}

const obtenerTarea = async (req, res) => {
    const { id } = req.params

    const tarea = await Tarea.findById(id).populate("proyecto")

    if (!tarea) {
        const error = new Error("Tarea no encontrada")
        res.status(404).json({ msg: error.message })
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(403).json({ error: error.message })
    }
    res.json(tarea)
}

const actualizarTarea = async (req, res) => {

    const { id } = req.params

    const tarea = await Tarea.findById(id).populate("proyecto")

    if (!tarea) {
        const error = new Error("Tarea no encontrada")
        res.status(404).json({ msg: error.message })
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(403).json({ error: error.message })
    }

    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }




}


const eliminarTarea = async (req, res) => {

    const { id } = req.params

    const tarea = await Tarea.findById(id).populate("proyecto")

    if (!tarea) {
        const error = new Error("Tarea no encontrada")
        res.status(404).json({ msg: error.message })
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(403).json({ error: error.message })
    }

    try {
        await tarea.deleteOne();
        res.json({ msg: "Tarea Eliminada" })
    } catch (error) {
        console.log(error)
    }




}


const cambiarEstado = async (req, res) => {


}



export { cambiarEstado, obtenerTarea, agregarTarea, actualizarTarea, eliminarTarea }
