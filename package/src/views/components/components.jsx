import React from "react"
import Header from "../../components/header/header.jsx"
import HeaderBanner from "../../components/banner/banner.jsx"
import Footer from "../../components/footer/footer.jsx"

import TestimonialComponent from "./sections/testimonialcomponent.jsx"

import Buttons from "./sections/buttons.jsx"

const Components = ({ userData }) => {
  return (
    <div id='main-wrapper'>
      <Header userData={userData} />
      <div className='page-wrapper'>
        <div className='container-fluid'>
          <HeaderBanner userData={userData} />
          <Buttons />
          <TestimonialComponent />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Components
