import Usuarios from "../models/Usuarios.js"
import Estados from "../models/Estados.js"
import Roles from "../models/Roles.js"
import bcryptjs from "bcryptjs"
import httpError from "../helpers/handleError.js"
import { response } from "express"

export const getUsers = async (req, res = response) => {
  try {
    const estado = await Estados.findOne({ Nombre: "ACTIVO" })
    const [total, usuarios] = await Promise.all([
      Usuarios.countDocuments(),
      Usuarios.find({ Estado: estado._id }).populate("Estado").populate("Rol"),
    ])
    res.json({ total, usuarios })
  } catch (error) {
    httpError(res, error)
  }
}

export const getUsersProcess = async (req, res = response) => {
  try {
    const estado = await Estados.findOne({ Nombre: "EN PROCESO" })
    const [total, usuarios] = await Promise.all([
      Usuarios.countDocuments(),
      Usuarios.find({ Estado: estado._id }).populate("Estado").populate("Rol"),
    ])
    res.json({ total, usuarios })
  } catch (error) {
    httpError(res, error)
  }
}

export const getUser = async (req, res = response) => {
  try {
    const [data] = await Promise.all([Usuarios.findById(req.params.id).populate("Estado").populate("Rol")])
    res.json(data)
  } catch (error) {
    httpError(res, error)
  }
}

export const getAllUser = async (req, res = response, next) => {
  try {
    const data = await Usuarios.find()
    res.json(data)
  } catch (error) {
    httpError(res, error)
  }
}

export const getUsersInactivos = async (req, res = response, next) => {
  try {
    const estado = await Estados.findOne({ Nombre: "INACTIVO" })
    const [total, usuarios] = await Promise.all([
      Usuarios.countDocuments(),
      Usuarios.find({ Estado: estado._id }).populate("Estado").populate("Rol"),
    ])
    res.json({ total, usuarios })
  } catch (error) {
    httpError(res, error)
  }
}

export const getUsersContratado = async (req, res = response, next) => {
  try {
    const estado = await Estados.findOne({ Nombre: "CONTRATADO" })
    const [total, usuarios] = await Promise.all([
      Usuarios.countDocuments(),
      Usuarios.find({ Estado: estado._id }).populate("Estado").populate("Rol"),
    ])
    res.json({ total, usuarios })
  } catch (error) {
    httpError(res, error)
  }
}

export const postUsers = async (req, res = response, next) => {
  try {
    const { Correo, Contrasena, ...data } = req.body
    const usuarioExiste = await Usuarios.findOne({ Correo })
    if (usuarioExiste) {
      return res.status(400).json({
        msg: "El usuario ya se encuentra registrado",
      })
    }
    const body = {
      ...data,
      Correo,
    }
    body.Contrasena = await Usuarios.encryptPassword(Contrasena)
    const usuario = new Usuarios(body)
    await usuario.save()
    res.json({
      message: "post api",
      usuario,
    })
  } catch (error) {
    httpError(res, error)
  }
}

export const deleteUsers = async (req, res = response, next) => {
  const usuario = await Usuarios.findByIdAndDelete({ _id: req.params.id })
  if (!usuario) {
    return res.json({ msg: "Usuario no encontrado" })
  }
  res.json(usuario)
}

/* export const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { email, password, ...resto } = req.body;
  const usuarioExiste = await Usuarios.findOne({ email });
  if (usuarioExiste) {
    return res.status(400).json({
      msg: "No puedes actualizar el correo con uno que ya se encuentre registrado",
    });
  }
  if (password) {
    resto.password = await Usuarios.encryptPassword(password);
  }
  const usuario = await Usuarios.findByIdAndUpdate(id, resto, { new: true });
  res.json({
    msg: "Usuario Actualizado",
    usuario: usuario,
  });
}; */

export const putUsers = async (req, res = response) => {
  const {
    Nombre,
    Apellido,
    Edad,
    Correo,
    Formacion,
    Descripcion,
    Disponibilidad,
    Foto,
    Certificado,
    Estrellas,
    Estado,
    Rol,
    Contrasena,
  } = req.body
  const updatedUser = {
    Nombre,
    Apellido,
    Edad,
    Correo,
    Formacion,
    Descripcion,
    Disponibilidad,
    Foto,
    Certificado,
    Estrellas,
    Estado,
    Rol,
    Contrasena,
  }
  try {
    const usuario = await Usuarios.findById(req.params.id)
    const estado = await Estados.findOne({ Nombre: Estado })
    if (!estado) {
      return res.status(404).json({ msg: "Estado Incorrecto" })
    } else {
    }
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" })
    }
    if (Contrasena) {
      Contrasena = await Usuarios.encryptPassword(password)
    }
    await Usuarios.findByIdAndUpdate(
      req.params.id,
      {
        Nombre,
        Apellido,
        Edad,
        Correo,
        Formacion,
        Descripcion,
        Disponibilidad,
        Foto,
        Certificado,
        Estrellas,
        Estado: estado._id,
        Rol,
        Contrasena,
      },
      { new: true }
    )
    res.json({
      msg: "Usuario Actualizado",
    })
  } catch (error) {
    console.error("Error al actualizar el usuario:", error)
    res.status(500).json({ msg: "Error interno del servidor" })
  }
}

export const currentUser = async (req, res) => {
  try {
    const current = await Usuarios.findOne({ _id: req.usuario._id }).populate("Rol")
    if (!current) {
      return res.json({ meg: "no pudimos encontrar tu cuenta" })
    }
    res.json(current)
  } catch (error) {
    res.status(500).json({ msg: "Error al traer el usuario actual" })
  }
}

export const patchCurrentUsers = async (req, res) => {
  const { Nombre, Apellido, Contrasena, Correo, Edad, Formacion, Descripcion, Foto, Disponibilidad, Certificado } = req.body
  try {
    const usuario = await Usuarios.findById(req.usuario._id.toString())
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" })
    }

    const updateFields = {};

    if(Nombre) updateFields.Nombre = Nombre
    if(Apellido) updateFields.Apellido = Apellido
    if(Correo) updateFields.Correo = Correo
    if(Edad) updateFields.Edad = Edad
    if(Formacion) updateFields.Formacion = Formacion
    if(Descripcion) updateFields.Descripcion = Descripcion
    if(Contrasena) updateFields.Contrasena = await Usuarios.encryptPassword(password)
    if(Disponibilidad) updateFields.Disponibilidad = Disponibilidad
    if(Foto) updateFields.Foto = Foto

    if (Certificado && Certificado.length > 0) {
      updateFields.$push = { Certificado: { $each: Certificado } };
    }

    await Usuarios.findByIdAndUpdate(req.usuario._id, updateFields);
    
    res.json({
      msg: "Usuario Actualizado",
    })
  } catch (error) {
    console.error("Error al actualizar el usuario:", error)
    res.status(500).json({ msg: "Error interno del servidor" })
  }
}
