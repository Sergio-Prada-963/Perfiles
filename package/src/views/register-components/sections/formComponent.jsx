import React, { useState } from "react"
import axios from "axios"

const FormComponent = () => {
  const [Nombre, setNombre] = useState("")
  const [Apellido, setApellido] = useState("")
  const [Correo, setCorreo] = useState("")
  const [Contrasena, setContrasena] = useState("")

  const register = (e) => {
    e.preventDefault()
    try {
      axios
        .post("http://localhost:9000/api/usuarios", {
          Nombre,
          Apellido,
          Correo,
          Contrasena,
        })
        .then(() => {
          window.location.href = "/login"
        })
        .catch((err) => {
          console.log(err)
          alert(err.response.data.msg)
        })
    } catch (error) {
      console.error("Error al registrar  ", error)
    }
  }

  return (
    <div className='form-campus dark'>
      <h3 className='title yellow'>REGISTRO</h3>
      <form onSubmit={(e) => register(e)}>
        <div className='input-form'>
          <label>Nombre</label>
          <div className='input-icon'>
            <div className='contain-icon'>
              <i className='fa-solid fa-user'></i>
            </div>
            <input type='text' onChange={(e) => setNombre(e.target.value)} required />
          </div>
        </div>
        <div className='input-form'>
          <label>Apellido</label>
          <div className='input-icon'>
            <div className='contain-icon'>
              <i className='fa-solid fa-user'></i>
            </div>
            <input type='text' onChange={(e) => setApellido(e.target.value)} required />
          </div>
        </div>
        <div className='input-form'>
          <label>Correo</label>
          <div className='input-icon'>
            <div className='contain-icon'>
              <i className='fa-solid fa-envelope'></i>
            </div>
            <input type='email' onChange={(e) => setCorreo(e.target.value)} required />
          </div>
        </div>
        <div className='input-form'>
          <label>Contraseña</label>
          <div className='input-icon'>
            <div className='contain-icon'>
              <i className='fa-solid fa-lock'></i>
            </div>
            <input type='password' onChange={(e) => setContrasena(e.target.value)} required />
          </div>
        </div>
        <div className='check-box'>
          <input type='checkbox' required />
          <p>Acepto Terminos y condiciones</p>
        </div>
        <div>
          <button className='btn-submit' type='submit'>
            Registrarme
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormComponent
