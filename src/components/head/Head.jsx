import React from "react"

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
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
