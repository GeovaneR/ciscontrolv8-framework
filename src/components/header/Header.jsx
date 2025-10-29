import React, { useState } from "react"
import "./header.css"
import Head from "../head/Head"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { AnalyticsOutlined, PendingActions } from "@mui/icons-material"
import { Link } from "react-router-dom";

const Header = ({ dark, setMode }) => {
  // Toogle Menu
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <section className='header'>
        <Head dark={dark} setMode={setMode} />
        <header>
          <div className='container'>
            {/*<ul className='navMenu'>*/}
            <ul className={Mobile ? "navMenu-list" : "link"} onClick={() => setMobile(false)}>
              <li>
                <Link to="/">
                  <DashboardOutlinedIcon className='navIcon' />
                  Dashboard
                </Link>
              </li>
              <li>
                <AnalyticsOutlined className='navIcon' />
                <Link to="/control">Árvore dos Controles</Link>
              </li>
              <li>
                <PendingActions className='navIcon' />
                <a href='/'>Próximas Ações</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
      </section>
    </>
  )
}

export default Header
