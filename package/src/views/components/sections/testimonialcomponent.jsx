/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Row, Container } from "reactstrap"
import axios from "axios"

import CardComponent from "./cardComponent"
import Files from "./files"

const TestimonialComponent = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loader, setloader] = useState(true)
  const [verDetalles, setDetalles] = useState(false)
  const [detalles, setDetalle] = useState({})
  const [ImgUser, setImgUser] = useState("")

  useEffect(() => {
    async function fetch() {
      try {
        await axios
          .get("http://localhost:9000/api/usuarios")
          .then((response) => {
            setUsuarios(response.data.usuarios)
            setloader(false)
          })
          .catch((err) => {
            console.error("error en getUsers  ", err)
            setloader(false)
          })
      } catch (error) {
        console.error("error en getUsers  ", error)
        setloader(false)
      }
    }
    fetch()
  }, [])

  const handleDetalle = (data, Img) => {
    setDetalle(data)
    setDetalles(true)
    setImgUser(Img)
  }

  if (loader) {
    return (
      <div className='centrado'>
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='testimonial3 spacer'>
        <Container>
          {verDetalles ? (
            <div className='detalle-container'>
              <div className='close-button'>
                <i className='fa-solid fa-xmark' onClick={() => setDetalles(false)}></i>
              </div>

              <div className='user-info'>
                <div className='d-flex flex-row align-items-center data'>
                  <img src={ImgUser} alt='img user' />
                  <div>
                    <p className='lite'>{detalles.Nombre}</p>
                    <p>{detalles.Apellido}</p>
                    <p className='stack'>{detalles.Formacion}</p>
                  </div>
                </div>
              </div>

              <div className='description'>
                <h5>Descripción</h5>
                <p>{detalles.Descripcion}</p>
              </div>

              <div className='rating'>
                <h5>Valoración</h5>
                <p>
                  <div>

                  <i className='fa-solid fa-exclamation'></i>
                  </div>
                  Esta valoración es una calificación personal de las habilidades propias del usuario
                </p>
                <div className='stars mb-3'>
                  <i className='fa-solid fa-star cheked'></i>
                  <i className='fa-solid fa-star cheked'></i>
                  <i className='fa-solid fa-star cheked'></i>
                  <i className='fa-solid fa-star uncheked'></i>
                  <i className='fa-solid fa-star uncheked'></i>
                </div>
              </div>

              <div className='certificates'>
                <h5>Certificados</h5>
                <div className='d-flex flex-row justify-content-between'>
                  <div className='d-flex flex-row g-2'>
                    {detalles.Certificado.map((e) => (
                      <Files keyy={e} />
                    ))}
                  </div>
                  <div className='d-flex'>
                    <button
                      className='btn-contactar'
                      type='button'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'
                    >
                      Contactar
                    </button>
                    <button className='close' onClick={() => setDetalles(false)}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Row className='testi3 m-t-40 justify-content-center'>
              {usuarios.map((user, index) => (
                <CardComponent
                  key={index}
                  setDetalles={setDetalles}
                  handleDetalle={handleDetalle}
                  user={user}
                />
              ))}
            </Row>
          )}
        </Container>
        <div
          className='modal fade'
          id='staticBackdrop'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          tabIndex='-1'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                  Contactar
                </h1>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
              </div>
              <div className='modal-body'>
                <div className='mb-3'>
                  <label htmlFor='exampleFormControlInput1' className='form-label'>
                    Tu Correo
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='exampleFormControlInput1'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                    Mensaje
                  </label>
                  <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    placeholder='...'
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                    Link Entrevista (opcional)
                  </label>
                  <input type="link" className='form-control' id='exampleFormControlInput1' placeholder="Link entrevista"/>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-warning' data-bs-dismiss='modal'>
                  Enviar
                </button>
                <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialComponent
