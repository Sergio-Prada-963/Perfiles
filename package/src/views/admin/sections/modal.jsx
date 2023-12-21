import React, {useState, useEffect} from "react";

const Modal = ({camperData})=>{
    const [image, setImage] = useState("")

    useEffect(() => {
        let ImgUser
        try {
          ImgUser = require(`../../../assets/images/uploads/img/${camperData.Foto}`)
          if (ImgUser) setImage(ImgUser)
        } catch (error) {
          ImgUser = require("../../../assets/images/uploads/img/default.png")
          setImage(ImgUser)
        }
      }, [camperData])

    return (
        <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                Informacion Registrada
              </h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {/* informacion */}
              {camperData && (
                <div className='card' style={{ width: "18rem" }}>
                  {/* Puedes personalizar esto según la estructura de tu respuesta de la API */}
                  <img src={image} className='card-img-top' alt='Avatar' />
                  <div className='card-body'>
                    <h5 className='card-title'>{camperData.Nombre}</h5>
                    <h6>Edad: {camperData.Edad} </h6>
                    <h5>{camperData.Formacion} </h5>
                    <p className='card-text'>{camperData.Disponibilidad ? "Si puede viajar" : "No puede viajar"}</p>
                    <p className='card-text'>{camperData.Descripcion}</p>
                  </div>
                </div>
              )}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Modal;