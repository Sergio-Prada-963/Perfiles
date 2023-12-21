import React from "react"
import HeaderBanner from "../../components/banner-curriculum/banner.jsx"
import Footer from "../../components/footer/footer.jsx"
import ConfigPerfil from "./sections/configPerfil.jsx"

const Curriculum = ({ userData, functionIni }) => {
  return (
    <div id='main-wrapper '>
      <div className='page-wrapper fondo'>
        <div className='container-fluid'>
          <HeaderBanner userData={userData} />
        </div>
        <ConfigPerfil userData={userData} functionIni={functionIni}/>
      </div>
      <Footer />
    </div>
  )
}

export default Curriculum
