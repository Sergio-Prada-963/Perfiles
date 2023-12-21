import React from "react"
import { Row, Col, Container } from "reactstrap"

const FormLogin = () => {
  return (
    <div className='form-login d-flex flex-row'>
      <div className='form-campus d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <h3 className='title yellow'>Login</h3>
          <form className='form-login-data'>
            <div className='input-form'>
              <label>Correo</label>
              <div className='input-icon'>
                <div className='contain-icon'>
                  <i className='fa-solid fa-envelope'></i>
                </div>
                <input type='email' />
              </div>
            </div>
            <div className='input-form'>
              <label>Contraseña</label>
              <div className='input-icon'>
                <div className='contain-icon'>
                  <i className='fa-solid fa-lock'></i>
                </div>
                <input type='password' />
              </div>
            </div>
            <div className='check-box'>
              <p>
                He olvidado mi contraseña <span>click aqui</span>
              </p>
            </div>
            <div>
              <button className='btn-submit' type='submit'>
                Iniciar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='d-flex align-items-center form-login-logo'>
        <Container>
          <Row className='justify-content-center '>
            <Col md='6' className='align-self-center text-center d-flex flex-column'>
              <h2 className='title white'>Aun no tienes cuenta ?</h2>
              <a
                className='btn btn-outline-light btn-rounded btn-md btn-arrow m-t-20'
                data-toggle='collapse'
                href='/register'
              >
                <span>
                  Registrarse <i className='ti-arrow-right'></i>
                </span>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default FormLogin
