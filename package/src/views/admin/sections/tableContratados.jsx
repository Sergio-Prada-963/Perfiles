import React from "react"
import { Container, Row, Col } from "reactstrap"
import Swal from "sweetalert2";
import axios from 'axios'
import Modal from "reactstrap";

const TableContratados = ({ usuarios,getDataActive,getDataNew, setCamper}) => {
  const putActive = async (id) => {
    console.log(id)

    try {
      Swal.fire({
        icon: "question",
        title: "Restablecer",
        text: "A que estado deseas restablecerlo",
        showConfirmButton: true,
        confirmButtonText: "Revision",
        confirmButtonColor: "#ECAC22",
        showDenyButton: true,
        denyButtonText: "Aprobados",
        denyButtonColor: "#00AA80",
        showCancelButton: true
      }).then(async (result)=>{
          if(result.isConfirmed){
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
          } else if (result.isDenied){
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
          }
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
         
            
    
            })
            .catch((err) => {
              console.error("Un error :(", err)
            })

        }})
  }
  return (
    <div>
              <Container>
          <Row className='justify-content-start'>
            <Col md='7' className='mt-5 mb-3 '>
              <h5 className='subtitle'>Aquí puedes ver a todas las personas que han sido contardados </h5>
            </Col>
          </Row>
        </Container>
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
                    <th>Restablecer</th>
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
                          onClick={() => setCamper(usuario._id)}
                        >
                          Ver
                        </button>
                      </td>
                      <td>
                        <button type='button' className='btn btn-success'
                          onClick={()=>putActive(usuario._id)}
                        >
                        <i class="fa-solid fa-rotate-right"></i>
                        </button>
                      </td>
                    
                      <td>
                        <button type='button' className='btn btn-danger'
                        onClick = {()=>{
                          Delete(usuario._id)
                        }}
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
      
    </div>
  )
}

export default TableContratados
