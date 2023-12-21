import mongoose from "mongoose"

const RolesSchema = new mongoose.Schema(
  {
    Nombre: {
      type: String,
      required: [true, "El nombre del rol es Obligatorio"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Roles = mongoose.model("Roles", RolesSchema, "Roles")
export default Roles
