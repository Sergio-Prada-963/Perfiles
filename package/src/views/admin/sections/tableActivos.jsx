import React from "react"
import { Container, Row, Col } from "reactstrap"
import axios from "axios"
import Swal from "sweetalert2"

const TablaActivos = ({ usuarios, getDataActive, getDataNew, setIdCamper, getDataContrato }) => {
  const putContratados = async (id) => {
    try {
      await axios
        .put(
          `http://localhost:9000/api/usuarios/${id}`,
          {
            Estado: "CONTRATADO",
          },
          { withCredentials: true }
        )
        .then((response) => {
          getDataActive()
          getDataNew()
          getDataContrato()
        })
        .catch((err) => {
          console.error("Un error :(", err)
        })
    } catch (error) {
      console.error("Ha ocurrido un error", error)
    }
  }

  const putInactivos = async (id) => {
    try {
      await axios
        .put(
          `http://localhost:9000/api/usuarios/${id}`,
          {
            Estado: "EN PROCESO",
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
    Swal.fire({
      icon: "question",
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
      }
    })
  }

  return (
    <div className='mt-5'>
      <div className='spacer' id='table-component'>
        <Container>
          <Row className='justify-content-start'>
            <Col md='7' className=''>
              <h1 className='title font-bold text-light '>Usuarios Aprobados</h1>
              <h6 className='subtitle'>Aquí puedes revisar a todos los usuarios para su estado de contratación </h6>
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
                    <th>Formacion</th>
                    <th>Descripción</th>
                    <th>Contratado</th>
                    <th>Desaprobar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario, index) => (
                    <tr key={usuario._id} className='pointer'>
                      <th scope='row'>{index + 1}</th>
                      <td>{usuario.Nombre}</td>
                      <td>{usuario.Formacion}</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target='#staticBackdrop'
                          onClick={() => setIdCamper(usuario._id)}
                        >
                          Ver
                        </button>
                      </td>
                      <td>
                        <button type='button' className='btn btn-warning' onClick={() => putContratados(usuario._id)}>
                          <i class='fa-solid fa-clipboard-check'></i>
                        </button>
                      </td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          onClick={() => {
                            putInactivos(usuario._id)
                          }}
                        >
                          <i className='fa-solid fa-thumbs-down'></i>
                        </button>
                      </td>
                      <td>
                        <button type='button' className='btn btn-danger' onClick={() => Delete(usuario._id)}>
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
    </div>
  )
}

export default TablaActivos
