import Router from "express"
import { check } from "express-validator"
import validateDocuments from "../middlewares/validate.documents.js"
import validJWT from "../middlewares/validate.jwt.js"
import * as usuariosControllers from "../controllers/usuarios.controllers.js"

const router = Router()

router.get("/", usuariosControllers.getUsers)
router.get("/inactivo", usuariosControllers.getUsersInactivos)
router.get("/contratado", usuariosControllers.getUsersContratado)
router.get("/all", usuariosControllers.getAllUser)
router.get("/proceso", usuariosControllers.getUsersProcess)

router.get("/current", [validJWT, validateDocuments], usuariosControllers.currentUser)

router.get("/user/:id", [validateDocuments], usuariosControllers.getUser)

router.post(
  "/",
  [
    check("Nombre", "Nombre no es valido").not().isEmpty(),
    check("Apellido", "Apellido no es valido").not().isEmpty(),
    check("Contrasena", "Contraseña debe ser de minimo 10 caracteres").isLength({
      min: 10,
    }),
    check("Correo", "El email no es valido").isEmail(),
    validateDocuments,
  ],
  usuariosControllers.postUsers
)

router.delete(
  "/:id",
  [validJWT, check("id", "No es un ID válido").isMongoId(), validateDocuments],
  usuariosControllers.deleteUsers
)

router.put(
  "/:id",
  [validJWT, check("id", "No es un ObjectID MongoDB válido").isMongoId(), validateDocuments],
  usuariosControllers.putUsers
)

router.patch(
  "/update/current",
  [
    check("Nombre", "Debe tener un Nombre valido").not().isEmpty(),
    check("Apellido", "Debe tener un Apellido valido").not().isEmpty(),
    check("Correo", "Debe tener un Correo valido").not().isEmpty().isEmail(),
    validJWT,
    validateDocuments,
  ],
  usuariosControllers.patchCurrentUsers
)

export default router
