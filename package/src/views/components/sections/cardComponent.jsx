import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap"
import { useInView } from "react-intersection-observer"

const CardComponent = ({ setDetalles, handleDetalle, user }) => {
  const { ref: myRef, inView: isVisible } = useInView()
  const [ImgUser, setImgUser] = useState("")

  useEffect(() => {
    let ImgUserr
    try {
      ImgUserr = require(`../../../assets/images/uploads/img/${user.Foto}`)
      if (ImgUserr) setImgUser(ImgUserr)
    } catch (error) {
      ImgUserr = require("../../../assets/images/uploads/img/default.png")
      setImgUser(ImgUserr)
    }
  }, [user])

  console.log(ImgUser);

  return (
    <div ref={myRef} className='col-md-6 col-lg-4'>
      <Card className={isVisible ? "card-shadow cards" : "card-shadow"}>
        <CardBody>
          <h6 className='font-light m-b-30'>{user.Descripcion}</h6>
          <div className='d-flex no-block align-items-center'>
            <span className='thumb-img'>
              <img src={ImgUser} alt='wrapkit' className='circle' />
            </span>
            <div className='m-l-20'>
              <h6 className='m-b-0 customer'>{user.Nombre}</h6>
              <div className='font-10'>
                <a href='' className='text-success'>
                  <i className='fa fa-star'></i>
                </a>
                <a href='' className='text-success'>
                  <i className='fa fa-star'></i>
                </a>
                <a href='' className='text-success'>
                  <i className='fa fa-star'></i>
                </a>
                <a href='' className='text-success'>
                  <i className='fa fa-star'></i>
                </a>
                <a href='' className='text-muted'>
                  <i className='fa fa-star'></i>
                </a>
              </div>
            </div>
          </div>
          <button
            className='btn btn-outline-light btn-rounded btn-md btn-arrow m-t-20'
            data-toggle='collapse'
            onClick={() => {
              setDetalles(true)
              handleDetalle(user,ImgUser)
            }}
          >
            <span>
              Detalles <i className='ti-arrow-right'></i>
            </span>
          </button>
        </CardBody>
      </Card>
    </div>
  )
}

export default CardComponent
