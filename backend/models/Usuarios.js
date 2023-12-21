import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

const UsuarioSchema = new mongoose.Schema(
  {
    Nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },

    Apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
    },

    Edad: {
      type: String,
      required: false,
    },

    Correo: {
      type: String,
      required: [true, "El correo es sobligatorio"],
      unique: true,
    },

    Contrasena: {
      type: String,
      required: [true, "La contraseña es necesaria"],
    },

    Formacion: {
      type: String,
    },

    Descripcion: {
      type: String,
    },

    Disponiblidad: {
      type: Boolean,
      default: false,
    },

    Foto: {
      type: String,
      default: "default.png",
    },

    Certificado: {
      type: Array,
    },

    Estrellas: {
      type: Number,
      default: 0,
    },

    Estado: {
      type: mongoose.Schema.Types.ObjectId,
      default: "65805b8e11d9e9bca2c5eb6d",
      ref: "Estados",
    },

    Rol: {
      type: mongoose.Schema.Types.ObjectId,
      default: "657ccc773a2b191b4fcf2fb5",
      ref: "Roles",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

UsuarioSchema.statics.encryptPassword = (Contrasena) => {
  const salt = bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(Contrasena, salt)
}

const Usuarios = mongoose.model("Usuarios", UsuarioSchema, "Usuarios")
export default Usuarios
