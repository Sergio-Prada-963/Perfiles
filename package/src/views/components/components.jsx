import React from "react"
import PropTypes from "prop-types"

// core components
import Header from "../../components/header/header.jsx"
import HeaderBanner from "../../components/banner/banner.jsx"
import Footer from "../../components/footer/footer.jsx"

import TestimonialComponent from "./sections/testimonialcomponent.jsx"

// sections for this page
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

Components.propTypes = {
  classes: PropTypes.object,
}

export default Components
