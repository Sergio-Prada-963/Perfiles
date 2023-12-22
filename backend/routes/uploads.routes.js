import { Router } from "express"
import * as uploadsControlers from "../controllers/upload.controllers.js"
import validateDocuments from "../middlewares/validate.documents.js"
import validJWT from "../middlewares/validate.jwt.js"

const router = Router()

router.post("/file",[
  validJWT, 
validateDocuments,],uploadsControlers.uploadFile)

router.post("/img", [validJWT, validateDocuments], uploadsControlers.uploadImg)

export default router
