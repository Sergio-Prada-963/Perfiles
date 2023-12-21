import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import dbConnection from "../database/config.js"
import allRoutes from "./../routes/index.js"

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.app.use(cookieParser())
    this.routesV1 = "/api"
    this.connectDB()
    this.middlewares()
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204,
      })
    )
    this.app.use(express.json())
    //this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    )
  }

  routes() {
    this.app.use(this.routesV1, allRoutes)
    this.app.post("/api/logout", (req, res) => {
      res.status(200).json({ message: "Sesión cerrada exitosamente" })
    })
    this.app.post("/api/logout", (req, res) => {
      // Realiza el proceso de cierre de sesión aquí
      // Agrega las cabeceras para evitar el almacenamiento en caché
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate") // HTTP 1.1
      res.setHeader("Expires", "0") // Proxies

      // Envía la respuesta
      res.send("Sesión cerrada exitosamente")
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`SERVER RUNNING ON PORT: ${this.port}`)
    })
  }
}

export default Server
