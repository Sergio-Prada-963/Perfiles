import React, { useState, useEffect } from "react"
import HeaderBanner from "../../components/banner-curriculum/banner.jsx"
import Footer from "../../components/footer/footer.jsx"
import PageTable from "./sections/table.jsx"
import TablaActivos from "./sections/tableActivos.jsx"
import ConfigPerfil from "./sections/configPerfil.jsx"
import TableContratados from "./sections/tableContratados.jsx"
import { Container } from "reactstrap"
import axios from "axios"

const Admin = ({ userData }) => {
  const [usuarios, setUsuarios] = useState([])
  const [aprovacion, setAprovacion] = useState([])
  const [contratados, setContrtados] = useState([])
  const [isPerfil, setIsPerfil] = useState(false)
  const [isSelectedCurriculum, setIsSelectedCurriculum] = useState(true)
  const [isSelectedContratados, setIsSelectedContratados] = useState(false)
  //selected view camper
  const [idCamper, setIdCamper] = useState(null)

  async function getDataActive() {
    try {
      const response = await axios.get("http://https://apicampuscv.onrender.com/api/usuarios")
      setUsuarios(response.data.usuarios)
    } catch (error) {
      console.error("Ha ocurrido un error", error)
    }
  }

  async function getDataNew() {
    try {
      const response = await axios.get("http://https://apicampuscv.onrender.com/api/usuarios/proceso")
      setAprovacion(response.data)
    } catch (error) {
      console.error("Ha ocurrido un error", error)
    }
  }

  async function getDataContrato() {
    try {
      const response = await axios.get("http://https://apicampuscv.onrender.com/api/usuarios/contratado")
      setContrtados(response.data.usuarios)
    } catch (error) {
      console.error("Ha ocurrido un error", error)
    }
  }

  useEffect(() => {
    getDataActive()
    getDataNew()
    getDataContrato()
  }, [])

  const handleCurriculumClick = () => {
    setIsPerfil(false)
    setIsSelectedCurriculum(true)
    setIsSelectedContratados(false)
  }

  const handleContratadosClick = () => {
    setIsPerfil(false)
    setIsSelectedCurriculum(false)
    setIsSelectedContratados(true)
  }

  const handlePerfilClick = () => {
    setIsPerfil(true)
    setIsSelectedCurriculum(false)
    setIsSelectedContratados(false)
  }

  return (
    <div id='main-wrapper '>
      <div className='page-wrapper fondo'>
        <div className='container-fluid'>
          <HeaderBanner userData={userData} />
          <Container>
            <div className='li-admin'>
              <ul>
                <div>
                  <li onClick={handleCurriculumClick}>
                    <a href='#0' className={isSelectedCurriculum ? "text-yellow" : ""}>
                      Curriculum
                    </a>
                  </li>
                  <li onClick={handleContratadosClick}>
                    <a href='#0' className={isSelectedContratados ? "text-yellow" : ""}>
                      Contratados
                    </a>
                  </li>
                </div>
                <div>
                  <li onClick={handlePerfilClick}>
                    <a href='#0' className={isPerfil ? "text-yellow" : ""}>
                      <i className='fa-solid fa-gear'></i> Perfil
                    </a>
                  </li>
                </div>
              </ul>
            </div>
          </Container>
          {isPerfil ? (
            <ConfigPerfil userData={userData} />
          ) : (
            <div>
              {isSelectedContratados ? (
                <TableContratados usuarios={contratados} getDataActive={getDataActive} getDataNew={getDataNew} idCamper={idCamper} setIdCamper={setIdCamper} getDataContrato={getDataContrato}/>
              ) : (
                <div>
                  <PageTable aprovacion={aprovacion} getDataNew={getDataNew} getDataActive={getDataActive} idCamper={idCamper} setIdCamper={setIdCamper} />
                  <TablaActivos usuarios={usuarios} getDataActive={getDataActive}  getDataNew={getDataNew} setIdCamper={setIdCamper} getDataContrato={getDataContrato}/>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Admin
