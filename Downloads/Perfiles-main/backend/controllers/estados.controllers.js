import Estados from "../models/Estados.js"
import { response } from "express"
import httpError from "./../helpers/handleError.js"

export const getCampers = async (req, res = response) => {
  try {
    const [total, camper] = await Promise.all([Estados.countDocuments(), Estados.find({ Estado: true })])
    res.json({
      total,
      camper,
    })
  } catch (error) {
    httpError(res, error)
  }
}

export const getCamperCumple = async (req, res = response) => {
  try {
    const cumple = await Estados
  } catch (error) {}
}

export const getCamper = async (req, res = response) => {
  try {
    const camper = await Estados.findOne({ _id: req.params.id, Estado: true })
    res.json(camper)
  } catch (error) {
    httpError(res, error)
  }
}

export const postCamper = async (req, res = response) => {
  try {
    const { Documento, ...data } = req.body
    const documentoExists = await Estados.findOne({ Documento })
    if (documentoExists) {
      return res.status(400).json({
        msg: "el documento ya existe en de DB",
      })
    }
    const body = {
      ...data,
      Documento,
    }
    const camper = new Camper(body)
    await camper.save()
    res.json({
      message: "post api",
      camper,
    })
  } catch (error) {
    httpError(res, error)
  }
}

export const deleteCamper = async (req, res) => {
  try {
    const { id } = req.params
    const camper = await Estados.findByIdAndUpdate(id, { Estado: false })
    return res.status(200).json({ camper, msg: "Camper eliminada correctamente" })
  } catch (error) {
    httpError(res, error)
  }
}

export const putCamper = async (req, res = response) => {
  try {
    const { id } = req.params
    const { Documento, Archivos, ...data } = req.body
    const documentoRepetido = await Estados.findOne({ Documento })
    if (!documentoRepetido) {
      return res.status(400).json({
        msg: "No puedes actualizar el documento por uno ya existente",
      })
    }
    if (Archivos && Archivos.length > 0) {
      // Realiza la actualización del documento y agrega los nuevos archivos al campo Archivos
      const camper = await Estados.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            Archivos: { $each: Archivos },
          },
          ...data, // Incluye otros datos para actualizar
        },
        { new: true }
      )

      return res.status(200).json({
        camper,
        msg: "El camper fue actualizado correctamente con nuevos archivos",
      })
    } else {
      // Si no se proporcionaron archivos para agregar, actualiza solo los otros datos
      const camper = await Estados.findByIdAndUpdate(id, data, { new: true })
      return res.status(200).json({
        camper,
        msg: "El camper fue actualizado correctamente sin agregar nuevos archivos",
      })
    }
  } catch (error) {
    httpError(res, error)
  }
}

export const updateDate = async (req, res = response) => {
  try {
    const id = req.params.id
    const { citas } = req.body
    const inicio = citas.start
    const final = citas.end
    const date = await Estados.findByIdAndUpdate(id, {
      citas: {
        cited: citas.cited,
        start: inicio,
        end: final,
        allDay: citas.allDay,
      },
    })
    res.status(200).json(date)
  } catch (error) {
    httpError(res, error)
  }
}
