import express from "express";
import { usuarios, registrar, autenticar } from "../controllers/usuarioController.js"

const router = express.Router()

router.get("/", usuarios);
router.post("/", registrar);
router.post("/login", autenticar)



export default router;
