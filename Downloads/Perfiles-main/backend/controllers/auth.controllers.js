import { response } from "express"
import Usuarios from "./../models/Usuarios.js"
import bcryptjs from "bcryptjs"
import generateJWT from "../helpers/generate.JWT.js"
import CryptoJS from "crypto-js"

function encryptToken(data, password) {
  const encrypted = CryptoJS.AES.encrypt(data, password)
  return encrypted.toString()
}

export const login = async (req, res = response) => {
  const { Correo, Contrasena } = req.body
  try {
    const usuario = await Usuarios.findOne({ Correo })

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no es correcto",
      })
    }
    if (usuario.Estado.toString() === "657cc8093a2b191b4fcf2fa4") {
      return res.status(400).json({
        msg: "Estado Inactivo",
      })
    }
    const validPassword = bcryptjs.compareSync(Contrasena, usuario.Contrasena)
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password Incorrecto",
      })
    }
    const encryptedData = encryptToken(await generateJWT(usuario.id), process.env.TOKEN_KEY)

    res.cookie("secretX", encryptedData)
    res.json({
      secretX: encryptedData,
    })
  } catch (error) {
    console.log(error)
    return res.json({
      msg: "contacte al servicio tecnico",
    })
  }
}

export default login
