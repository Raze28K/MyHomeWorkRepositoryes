import { Outlet } from "react-router-dom"
import Tabs from "./Tabs/Tabs"

function Layout({ onLogout }) {
  return (
    <>
      <Tabs />
      <button onClick={onLogout}>Выйти</button>
      <Outlet />
    </>
  )
}

export default Layout
