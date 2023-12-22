import React, { useRef, useState, useEffect } from "react"
import { Container } from "reactstrap"
import axios from "axios"
import Default from "../../../assets/images/uploads/img/default.png"
import Swal from "sweetalert2"

const ConfigPerfil = ({ userData }) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState("")
  const [newImage, setNewImage] = useState("")

  const [Nombre, setNombre] = useState(userData.Nombre)
  const [Apellido, setApellido] = useState(userData.Apellido)
  const [Correo, setCorreo] = useState(userData.Correo)
  const [Contrasena, setContrasena] = useState("")

  useEffect(() => {
    let ImgUser
    try {
      ImgUser = require(`../../../assets/images/uploads/img/${userData.Foto}`)
      if (ImgUser) setImage(ImgUser)
    } catch (error) {
      ImgUser = require("../../../assets/images/uploads/img/default.png")
      setImage(ImgUser)
    }
  }, [userData])

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const handleImageChange = (event) => {
    setNewImage(event.target.files[0])
  }

  const updateProfile = (e) => {
    e.preventDefault()
    try {
      axios
        .patch(
          "http://localhost:9000/api/usuarios/update/current",
          {
            Nombre,
            Apellido,
            Correo,
            Contrasena,
          },
          { withCredentials: true }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'Sus datos han sido guardados correctamente.',
          });
        })
        .catch((err) => {
          console.log(err)
          if (err.response.data.msg) {
            alert(err.response.data.msg)
          }
        })
    } catch (error) {
      console.error("Error al actualizar perfil", error)
      alert("Error inesperado al actualizar perfil")
    }
  }

  return (
    <div className='update-profile'>
      <Container>
        <div className='personal-data'>
          <div className='upt-profile-title'>
            <h3>Actualizar Perfil</h3>
          </div>
          <form onSubmit={(e) => updateProfile(e)}>
            <div className='cont-data-form'>
              <div className='first-section'>
                <div className='upt-profile-inputs'>
                  <input type='text' placeholder='Nombres' value={Nombre} onChange={(e) => setNombre(e.target.value)} />
                  <input
                    type='text'
                    placeholder='Apellidos'
                    value={Apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                <div className='upt-profile-inputs'>
                  <input type='email' placeholder='Correo' value={Correo} onChange={(e) => setCorreo(e.target.value)} />
                  <input type='password' placeholder='Contraseña' onChange={(e) => setContrasena(e.target.value)} />
                </div>
                <div className='disponibilidad'>
                  <button type='submit' className='btn btn-success fw-light'>
                    Guardar
                  </button>
                </div>
              </div>

              <div className='change-img' onClick={handleImageClick}>
                {newImage ? (
                  <img src={URL.createObjectURL(newImage)} alt='img' />
                ) : image ? (
                  <img src={image} alt='img user' />
                ) : (
                  <img src={Default} alt='img' />
                )}
                <input type='file' accept='image/*' ref={inputRef} onChange={handleImageChange} />
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ConfigPerfil
