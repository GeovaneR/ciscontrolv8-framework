import React from "react"
import Cascade from "../cascade/Cascade"

const Control = () => {
  return (
    <>
      <section className='control'>
        <div className='container'>
          <div className='heading flexSB'>
            <h3>Árvore dos Controles</h3>
          </div>
          <Cascade />
        </div>
      </section>
    </>
  )
}

export default Control
