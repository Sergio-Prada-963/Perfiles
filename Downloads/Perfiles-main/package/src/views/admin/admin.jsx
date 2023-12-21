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

  const setCamper = (userId) => {
    localStorage.setItem("IDCAMPERadmi", userId)
    setIdCamper(userId)
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:9000/api/usuarios")
        setUsuarios(response.data.usuarios)
      } catch (error) {
        console.error("Ha ocurrido un error", error)
      }
    }
    getData()
  }, [])

  async function getDataActive() {
    try {
      const response = await axios.get("http://localhost:9000/api/usuarios")
      setUsuarios(response.data.usuarios)
    } catch (error) {
      console.error("Ha ocurrido un error", error)
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:9000/api/usuarios/proceso")
        setAprovacion(response.data)
      } catch (error) {
        console.error("Ha ocurrido un error", error)
      }
    }
    getData()
  }, [])

  async function getDataNew() {
    try {
      const response = await axios.get("http://localhost:9000/api/usuarios/proceso")
      setAprovacion(response.data)
    } catch (error) {
      console.error("Ha ocurrido un error", error)
    }
  }


  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:9000/api/usuarios/contratado")
        setContrtados(response.data.usuarios)
      } catch (error) {
        console.error("Ha ocurrido un error", error)
      }
    }
    getData()
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
                    <a href='#' className={isSelectedCurriculum ? "text-yellow" : ""}>
                      Curriculum
                    </a>
                  </li>
                  <li onClick={handleContratadosClick}>
                    <a href='#' className={isSelectedContratados ? "text-yellow" : ""}>
                      Contratados
                    </a>
                  </li>
                </div>
                <div>
                  <li onClick={handlePerfilClick}>
                    <a href='#' className={isPerfil ? "text-yellow" : ""}>
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
                <TableContratados usuarios={contratados} getDataActive={getDataActive} getDataNew={getDataNew} idCamper={idCamper} setIdCamper={setIdCamper} setCamper={setCamper}/>
              ) : (
                <div>
                  <PageTable aprovacion={aprovacion} getDataNew={getDataNew} getDataActive={getDataActive} idCamper={idCamper} setIdCamper={setIdCamper}  setCamper={setCamper}/>
                  <TablaActivos usuarios={usuarios} getDataActive={getDataActive}  getDataNew={getDataNew} idCamper={idCamper} setIdCamper={setIdCamper} setCamper={setCamper}/>
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
