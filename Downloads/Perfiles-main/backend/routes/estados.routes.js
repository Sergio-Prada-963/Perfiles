import Router from "express"
import * as estadosControllers from "../controllers/estados.controllers.js"
import validateDocuments from "../middlewares/validate.documents.js"
import validJWT from "../middlewares/validate.jwt.js"

const router = Router()

router.get("/", [validJWT, validateDocuments], estadosControllers.getCampers)

router.get("/:id", [validJWT, validateDocuments], estadosControllers.getCamper)

router.post("/", [validJWT, validateDocuments], estadosControllers.postCamper)

router.delete("/:id", [validJWT, validateDocuments], estadosControllers.deleteCamper)

router.put("/:id", [validJWT, validateDocuments], estadosControllers.putCamper)

router.patch("/:id", [validJWT, validateDocuments], estadosControllers.updateDate)

export default router
