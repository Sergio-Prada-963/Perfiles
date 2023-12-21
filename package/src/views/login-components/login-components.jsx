import React from "react"
import PropTypes from "prop-types"

// content
import FormComponent from "./sections/formComponent"

import GoForIt from "../../assets/images/campus/goforite.png"

const LoginComponents = () => {
  return (
    <div>
      <div className='grid-form-campus login'>
        <FormComponent />
        <div className='banner-info'>
          <img src={GoForIt} alt='GoForIt' />
          <h1 className='title'>Aun no tienes cuenta?</h1>
          <a
            className='btn btn-outline-light btn-rounded btn-md btn-arrow m-t-20'
            data-toggle='collapse'
            href='/register'
          >
            <span>
              Registrarse <i className='ti-arrow-right'></i>
            </span>
          </a>
        </div>
      </div>
      <div className='efect-gradient'>
        <div className='backgroung-form-campus'></div>
      </div>
    </div>
  )
}

LoginComponents.propTypes = {
  classes: PropTypes.object,
}

export default LoginComponents
