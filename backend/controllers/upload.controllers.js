import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { response } from "express"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const uploadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).send("No files were uploaded.")
  }

  const { file } = req.files
  const uploadPath = path.join(__dirname, "../../package/src/assets/images/uploads/file", file.name)

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.json({ msg: "File uploaded!" + uploadPath })
  })
}

export const uploadImg = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).send("No files were uploaded.")
  }

  const { file } = req.files
  const uploadPath = path.join(__dirname, "../../package/src/assets/images/uploads/img", file.name)

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.json({ msg: "File uploaded!" + uploadPath })
  })
}
