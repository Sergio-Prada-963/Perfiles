/* eslint-disable */
import React, { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const FormComponent = () => {
  const [Correo, setCorreo] = useState("")
  const [Contrasena, setContrasena] = useState("")

  const loguear = (e) => {
    e.preventDefault()
    try {
      axios
        .post("http://https://apicampuscv.onrender.com/api/auth/login", {
          Correo,
          Contrasena,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Inicio correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            document.cookie = `secretX=${response.data.secretX}`
            window.location.reload();
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            text: 'Usuario o Contraseña incorrectos',
          });
        })
    } catch (error) {
      console.error("Error al loguearse ", error)
    }
  }

  return (
    <div className='form-campus'>
      <h3 className='title yellow'>LOGIN</h3>
      <form onSubmit={(e) => loguear(e)}>
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
        <div className='forgot-password'>
          <p>
            He olvidado mi contraseña <a href='#'>Click Aqui</a>
          </p>
        </div>
        <div>
          <button className='btn-submit' type='submit'>
            Ingresar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormComponent
