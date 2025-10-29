import React from "react"
import { ContrastOutlined } from "@mui/icons-material"

const Head = ({ dark, setMode }) => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='left'>
            <div className='logo'>
              <img src='./assets/images/logo.png' alt='' />
            </div>
          </div>
          <div className='right flexCenter'>
            <div className='profile flexCenter'>
            </div>
            <button onClick={() => setMode(!dark)}>
              <ContrastOutlined className='iconHead' />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
