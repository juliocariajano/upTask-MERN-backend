import Proyecto from "../models/Proyectos.js";
import Tarea from "../models/Tareas.js";

const obtenerProyectos = async (req, res) => {

    const proyectos = await Proyecto.find().where("creador").equals(req.usuario)

    res.json(proyectos);

}

const nuevoProyecto = async (req, res) => {

    const proyecto = new Proyecto(req.body);

    proyecto.creador = req.usuario._id
    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.error(error)
    }

}

const obtenerProyecto = async (req, res) => {
    try {
        const { id } = req.params

        const proyectoConsultado = await Proyecto.findById(id);

        if (!proyectoConsultado) {
            const error = new Error("No encontrado");
            return res.status(404).json({ msg: error.message })
        }

        if (proyectoConsultado.creador.toString() !== req.usuario._id.toString()) {

            const error = new Error("Accion no valida")
            return res.status(401).json({ msg: error.message })
        }

        // Obtener las tareas del proyecto

        const tareas = await Tarea.find().where("proyecto").equals(proyectoConsultado._id);

        res.json({
            proyectoConsultado,
            tareas
        })


    } catch (error) {
        return res.status(500).json({ msg: "Error del servidor" })
    }
}

const editarProyecto = async (req, res) => {

    const { id } = req.params

    const proyectoConsultado = await Proyecto.findById(id);

    if (!proyectoConsultado) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message })
    }

    if (proyectoConsultado.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({ msg: error.message })
    }

    proyectoConsultado.nombre = req.body.nombre || proyectoConsultado.nombre;
    proyectoConsultado.descripcion = req.body.descripcion || proyectoConsultado.descripcion
    proyectoConsultado.fechaEntrega = req.body.fechaEntrega || proyectoConsultado.fechaEntrega;
    proyectoConsultado.cliente = req.body.cliente || proyectoConsultado.cliente
    try {
        const proyectoAlmacenado = await proyectoConsultado.save()
        res.json(proyectoAlmacenado)

    } catch (error) {
        return res.status(500).json({ msg: "Error del servidor" })
    }

}


const eliminarProyecto = async (req, res) => {
    const { id } = req.params

    const proyectoConsultado = await Proyecto.findById(id);

    if (!proyectoConsultado) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message })
    }

    if (proyectoConsultado.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({ msg: error.message })
    }

    try {
        await proyectoConsultado.deleteOne();
        res.json({ msg: "Proyecto Eliminado" })
    } catch (error) {
        console.log(error)
    }

}


const agregarColaborador = async () => {

}


const eliminarColaborador = async () => {

}

// const obtenerTareas = async (req, res) => {
//     const { id } = req.params

//     const proyectoExiste = await Proyecto.findById(id);
//     if (!proyectoExiste) {
//         const error = new Error("No Encontrado")
//         return res.status(404).json({ error: error.message })
//     }

//     const tareas = await Tarea.find().where("proyecto").equals(id)
//     return res.json(tareas)
// }

export { obtenerProyectos, obtenerProyecto, nuevoProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador }
