import axios from "axios"
import React, { useRef, useState, useEffect } from "react"
import { Container } from "reactstrap"
import Default from "../../../assets/images/uploads/img/default.png"
import Swal from 'sweetalert2';

const ConfigPerfil = ({ userData, functionIni }) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState("")
  const [nameUser, setNameUser] = useState(userData.Nombre)
  const [apellidoUser, setApellidoUser] = useState(userData.Apellido)
  const [emailUser, setEmailUser] = useState(userData.Correo)
  const [edadUser, setEdadUser] = useState(userData.Edad)
  const [formacionUser, setFormacionUser] = useState(userData.Formacion)
  const [descripcionUser, setDescripcionUser] = useState(userData.Descripcion)
  const [disponibilidadUser, setDisponibilidadUser] = useState(userData.Disponibilidad ? userData.Disponibilidad : false)
  const [estrellasUser, setEstrellasUser] = useState(userData.Estrellas)
  //img
  const [newImage, setNewImage] = useState("")
  const [nameNewImage, setNameNewImage] = useState("")
  const [formImage, setFormImg] = useState("")
  //files
  const [nameNewFile, setNameNewFile] = useState("")
  const [formFile, setFormFile] = useState("")

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
    if (event.target.files[0] != undefined) { 
      const file = event.target.files[0]
      console.log(file);
      setNameNewImage(file.name)
      var formData = new FormData();
      formData.append("file", file);
      setFormImg(formData)
      setNewImage(event.target.files[0])
    }
  }

  const handleFile = (e)=>{
    if (e.target.files[0] != undefined) { 
      const file = e.target.files[0]
      setNameNewFile(file.name)
      var formData = new FormData();
      formData.append("file", file);
      setFormFile(formData)
    }
  }

  const actualizarUser = (e) => {
    e.preventDefault();
    
     if (userData.Disponibilidad === undefined) {
      setDisponibilidadUser(false);
    }
    try {
      axios
        .patch(
          "http://localhost:9000/api/usuarios/update/current",
          {
            Foto: nameNewImage ? nameNewImage : userData.Foto ? userData.Foto : "default.png",
            Nombre: nameUser,
            Apellido: apellidoUser,
            Correo: emailUser,
            Edad: edadUser,
            Formacion: formacionUser,
            Descripcion: descripcionUser,
            Disponibilidad: disponibilidadUser,
            Estrellas: estrellasUser,
            Certificado: [{nameNewFile}]
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          if(formImage){
            axios.post("http://localhost:9000/api/uploads/img",formImage, {
                  withCredentials: true
                }
              ).then(()=>{
                Swal.fire({
                  icon: 'success',
                  title: '¡Guardado!',
                  text: 'Sus datos han sido guardados correctamente.',
                });
              }).catch((err)=>{
                console.log(err);
                Swal.fire({
                  icon: 'error',
                  title: '¡ERROR!',
                  text: "Error al guardar datos",
                });
              })
          }
          if(formFile){
            axios.post("http://localhost:9000/api/uploads/file",formFile, {
                  withCredentials: true
                }
              ).then(()=>{
                Swal.fire({
                  icon: 'success',
                  title: '¡Guardado!',
                  text: 'Sus datos han sido guardados correctamente.',
                });
              }).catch((err)=>{
                console.log(err);
                Swal.fire({
                  icon: 'error',
                  title: '¡ERROR!',
                  text: "Error al guardar datos",
                });
              })
          }
            Swal.fire({
              icon: 'success',
              title: '¡Guardado!',
              text: 'Sus datos han sido guardados correctamente.',
            });
            functionIni()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: "Error al guardar datos",
          });
        })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '¡ERROR!',
        text: "Error al guardar datos",
      });
    } 

    console.log({
      Img: nameNewImage ? nameNewImage : userData.Foto ? userData.Foto : "default.png",
      nameUser,
      apellidoUser,
      emailUser,
      edadUser,
      formacionUser,
      descripcionUser: disponibilidadUser ? true : false,
      disponibilidadUser,
      estrellasUser
    }) 

  }
  

  return (
    <div className='update-profile user'>
      <Container>
        <div className='personal-data'>
          <div className='upt-profile-title'>
            <h3>Datos Curriculum</h3>
          </div>
          <form>
            <div className='cont-data-form'>
              <div className='first-section'>
                <div className='upt-profile-inputs'>
                  <input
                    type='text'
                    placeholder='Nombres'
                    required
                    defaultValue={userData.Nombre}
                    onChange={(e) => setNameUser(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='Apellidos'
                    required
                    defaultValue={userData.Apellido}
                    onChange={(e) => setApellidoUser(e.target.value)}
                  />
                </div>
                <div className='upt-profile-inputs'>
                  <input
                    type='text'
                    placeholder='Correo'
                    defaultValue={userData.Correo}
                    onChange={(e) => setEmailUser(e.target.value)}
                  />
                  <div className='upt-profile-inputs user'>
                    <input
                      type='text'
                      placeholder='Edad'
                      required
                      defaultValue={userData.Edad}
                      onChange={(e) => setEdadUser(e.target.value)}
                    />
                    <select
                      name='formacion'
                      id='formacion'
                      required
                      defaultValue={userData.Formacion}
                      onChange={(e) => setFormacionUser(e.target.value)}
                    >
                      <option defaultValue='Frontend'>Frontend</option>
                      <option defaultValue='Backend'>Backend</option>
                      <option defaultValue='FullStack'>FullStack</option>
                    </select>
                  </div>
                </div>
                <div className='upt-profile-inputs'>
                  <textarea
                    name=''
                    id=''
                    cols='30'
                    rows='5'
                    required
                    placeholder='Descripcion'
                    defaultValue={userData.Descripcion}
                    onChange={(e) => setDescripcionUser(e.target.value)}
                  />
                </div>
                <div className='disponibilidad'>
                  <p>Disponibilidad de viajar</p>
                  <label className='switch'>
                    <input
                      type='checkbox'
                      checked={userData.Disponibilidad}
                      onChange={(e) => setDisponibilidadUser(e.target.value)}
                    />
                    <span className='slider'></span>
                  </label>
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

            <div className='certificados'>
              <div>
                <div className='upt-profile-title'>
                  <h3>Certificado de Estudio</h3>
                </div>

                <div className='upt-profile-inputs'>
                  <input type='file' className='form-control bg-transparent text-white' onChange={(e)=>handleFile(e)}/>
                </div>
              </div>
            </div>

            <div className='calificacion'>
              <div className='upt-profile-title'>
                <h3>Calificacion</h3>
                <p>Segun su conocimiento califique que tan acto esta para un trabajo profesional</p>
                <p className='yellow'>Sea muy sincero debido a que sera sometido/a a pruebas tecnicas</p>
              </div>
              <div className='rating'>
                <input type='radio' id='star5' name='rate' defaultValue='5' onChange={(e)=>setEstrellasUser(e.target.value)} />
                <label htmlFor='star5' title='text'>
                  <svg viewBox='0 0 576 512' height='1em' xmlns='http://www.w3.org/2000/svg' className='star-solid'>
                    <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                  </svg>
                </label>
                <input type='radio' id='star4' name='rate' defaultValue='4' onChange={(e)=>setEstrellasUser(e.target.value)} />
                <label htmlFor='star4' title='text'>
                  <svg viewBox='0 0 576 512' height='1em' xmlns='http://www.w3.org/2000/svg' className='star-solid'>
                    <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                  </svg>
                </label>
                <input type='radio' id='star3' name='rate' defaultValue='3' onChange={(e)=>setEstrellasUser(e.target.value)} />
                <label htmlFor='star3' title='text'>
                  <svg viewBox='0 0 576 512' height='1em' xmlns='http://www.w3.org/2000/svg' className='star-solid'>
                    <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                  </svg>
                </label>
                <input type='radio' id='star2' name='rate' defaultValue='2' onChange={(e)=>setEstrellasUser(e.target.value)} />
                <label htmlFor='star2' title='text'>
                  <svg viewBox='0 0 576 512' height='1em' xmlns='http://www.w3.org/2000/svg' className='star-solid'>
                    <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                  </svg>
                </label>
                <input type='radio' id='star1' name='rate' defaultValue='1' onChange={(e)=>setEstrellasUser(e.target.value)} />
                <label htmlFor='star1' title='text'>
                  <svg viewBox='0 0 576 512' height='1em' xmlns='http://www.w3.org/2000/svg' className='star-solid'>
                    <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                  </svg>
                </label>
              </div>
            </div>

            <button type='button' className='btn btn-success btnEnviarCurriculum' onClick={(e) => actualizarUser(e)}>
              Guardar
            </button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default ConfigPerfil
