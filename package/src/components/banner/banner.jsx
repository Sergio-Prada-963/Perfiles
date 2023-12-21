import React from "react"
import goForIt from "../../assets/images/campus/goforite.png"
import { HashLink as Link } from "react-router-hash-link"
import { Container, Row, Col } from "reactstrap"

const HeaderBanner = ({ userData }) => {
  return (
    <div className='static-slider-head'>
      <Container>
        <Row className='justify-content-center'>
          <Col lg='8' md='6' className='align-self-center text-center goforit'>
            <img src={goForIt} alt='GoForIt' style={{ width: "100%" }} />
            <h4 className='subtitle font-light'>
              "El mejor código es aquel que se escribe una vez
              <br /> y se lee muchas veces"
            </h4>
            {Object.keys(userData).length === 0 ? (
              <Link to='/login' className='btn btnLoginCampus m-t-30 btn-info-gradiant font-14'>
                Login
              </Link>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HeaderBanner
