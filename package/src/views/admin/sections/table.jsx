import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import axios from "axios"
import Swal from "sweetalert2"
import Modal from "./modal"

const PageTable = ({ aprovacion, getDataNew, getDataActive, idCamper, setIdCamper, setCamper }) => {
  const [camperData, setCamperData] = useState("")

  useEffect(() => {
    async function getData() {
      const idCarga = localStorage.getItem("IDCAMPERadmi")

      try {
        if (idCarga) {
          const response = await axios.get(`http://localhost:9000/api/usuarios/user/${idCarga}`)
          setCamperData(response.data)
        }
      } catch (error) {
        console.error("Ha ocurrido un error", error)
      }
    }
    getData()
  }, [idCamper])

  const putActive = async (id) => {
    console.log(id)

    try {
      await axios
        .put(
          `http://localhost:9000/api/usuarios/${id}`,
          {
            Estado: "ACTIVO",
          },
          { withCredentials: true }
        )
        .then((response) => {
          getDataActive()
          getDataNew()
        

        })
        .catch((err) => {
          console.error("Un error :(", err)
        })
    } catch (error) {
      console.error("Ha ocurrido un error", error)
    }
  }


  const Delete = async (id) => {
    console.log(id)
      Swal.fire({
        icon:"question",
        title: "Borrar",
        text: "¿Estas seguro que deseas borrar este usuario?",
        showCancelButton: true,
        showConfirmButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .put(
              `http://localhost:9000/api/usuarios/${id}`,
              {
                Estado: "INACTIVO",
              },
              { withCredentials: true }
            )
            .then((response) => {
              getDataActive()
              getDataNew()
            
    
            })
            .catch((err) => {
              console.error("Un error :(", err)
            })

        }})
  }


  console.log("Datos de aprovacion:", aprovacion)
  return (
    <div className='mt-5 '>
      <div className='spacer' id='table-component'>
        <Container>
          <Row className='justify-content-start'>
            <Col md='7' className=''>
              <h1 className='title font-bold text-light '>Para Revision</h1>
              <h6 className='subtitle'>
                Aquí están los usuarios que esperar ser aprobados para ser públicos sus perfiles
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md='12'>
            <div className='table-responsive '>
              <table className='table table-dark table-hover '>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Formacion</th>
                    <th>Descripción</th>
                    <th>Aprobar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  {aprovacion.usuarios &&
                    Array.isArray(aprovacion.usuarios) &&
                    aprovacion.usuarios.map((usuario, index) => (
                      <tr className='pointer' key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{usuario.Nombre}</td>
                        <td>{usuario.Edad}</td>
                        <td>{usuario.Formacion}</td>
                        <td>
                          <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-toggle='modal'
                            data-bs-target='#staticBackdrop'
                            onClick={() => setCamper(usuario._id)}
                          >
                            Ver
                          </button>
                        </td>
                        <td>
                          <button type='button' className='btn btn-success' onClick={() => putActive(usuario._id)}>
                            <i className='fa-solid fa-thumbs-up'></i>
                          </button>
                        </td>
                        <td>
                          <button type='button' className='btn btn-danger'
                            onClick={()=>{Delete(usuario._id)}}
                          >
                            <i className='fa-solid fa-trash'></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div></div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal camperData={camperData}/>
      
    </div>
  )
}

export default PageTable
