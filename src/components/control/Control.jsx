import React from "react"
import Cards from "../cards/Cards"
import Charts from "../charts/Charts"

const Control = () => {
  return (
    <>
      <section className='control'>
        <div className='container'>
          <div className='heading flexSB'>
            <h3>Árvore dos Controles</h3>
          </div>
          <Cards />
        </div>
      </section>
    </>
  )
}

export default Control
