import mongoose from "mongoose"

const estadosSchema = new mongoose.Schema(
  {
    Nombre: {
      type: String,
      required: [true, "EL nombre del estado es solicitado"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Estados = mongoose.model("Estados", estadosSchema, "Estados")
export default Estados
