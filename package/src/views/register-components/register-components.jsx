import React from "react"
import GoForIt from "../../assets/images/campus/goforite.png"
import FormComponent from "./sections/formComponent.jsx"

const RegisterComponents = () => {
  return (
    <div>
      <div className='grid-form-campus'>
        <FormComponent />
        <div className='banner-info'>
          <div className='cont-img'>
            <img src={GoForIt} alt='GoForIt' />
          </div>
        </div>
      </div>
      <div className='efect-gradient'>
        <div className='backgroung-form-campus'></div>
      </div>
    </div>
  )
}

export default RegisterComponents
