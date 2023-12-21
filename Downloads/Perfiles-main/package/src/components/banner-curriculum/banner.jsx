import React, { useState, useEffect } from "react"
import { Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import Admin1 from "../../assets/images/campus/admin-1.jpg"
import Swal from "sweetalert2"

const HeaderBanner = ({ userData }) => {
  const [image, setImage] = useState("")

  useEffect(() => {
    let ImgUser
    try {
      ImgUser = require(`../../assets/images/uploads/img/${userData.Foto}`)
      if (ImgUser) setImage(ImgUser)
    } catch (error) {
      ImgUser = require("../../assets/images/uploads/img/default.png")
      setImage(ImgUser)
    }
  }, [userData])

  const logout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Cerrar Sesion',
      text: '¿Seguro que quieres salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "secretX=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        window.location.reload()
      }})
  }

  return (
    <div className='static-slider-admin banner3'>
      <div className=' d-flex col-12'>
        <Row className='nav-admin justify-content-center'>
          <Col lg='10' md='6' className='d-flex align-self-center justify-content-between '>
            <div className='d-flex align-items-center ms-3'>
              <div className=''>
                <img src={image} alt='img admin' className='admin' />
              </div>

              <div className='user-admin d-flex flex-column align-items-start'>
                <h2 className='title'>{userData.Nombre}</h2>
                <h2 className='title'>{userData.Apellido}</h2>
                <h4 className='subtitle font-light'>{userData.Rol.Nombre}</h4>
              </div>
            </div>

            <div className='home-nav-admin d-flex align-items-center gap-4'>
              <Link to='/' className='link-admin font-18'>
                Home
              </Link>
              <div className='act-buttons'>
                <Link to='/' className='btn btn-success-gradiant font-16' onClick={(e) => logout(e)}>
                  Salir
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default HeaderBanner
