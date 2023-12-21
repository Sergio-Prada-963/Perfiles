import { Router } from "express"
import { check } from "express-validator"
import * as loginValidator from "../controllers/auth.controllers.js"
import validateDocuments from "../middlewares/validate.documents.js"

const router = Router()

router.post(
  "/login",
  [
    check("Correo", "El Correo es obligatorio").isEmail(),
    check("Contrasena", "La contraseña es obligatorio").not().isEmpty(),
    validateDocuments,
  ],
  loginValidator.login
)

export default router
