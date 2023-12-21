import { response, request } from "express"
import jwt from "jsonwebtoken"
import Usuarios from "../models/Usuarios.js"
import CryptoJS from "crypto-js"

const validJWT = async (req = request, res = response, next) => {
  const { secretX } = req.cookies
  if (!secretX) return res.status(400).json({ message: "no hay token en la peticion" })

  try {
    const decryptedToken = CryptoJS.AES.decrypt(secretX, process.env.TOKEN_KEY)
    const decodedToken = decryptedToken.toString(CryptoJS.enc.Utf8)

    const { uid } = jwt.verify(decodedToken, process.env.SECRET_OR_PRIVATE_KEY)
    const usuario = await Usuarios.findById(uid)

    if (!usuario) return res.status(400).json({ message: "Token no valido - Usuario no existe en la BD" })

    if (usuario.Estado.toString() === "657cc8093a2b191b4fcf2fa4")
      return res.status(400).json({ message: "Token no valido - Usuario con estado false" })

    req.usuario = usuario
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "jmmmm token no valido.. -_-" })
  }
}
export default validJWT
