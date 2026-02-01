import { NavLink } from "react-router-dom"
import styles from "./Tabs.module.css"

function Tabs() {
  return (
    <div className={styles.tabs}>
      <NavLink
        to="/feed"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Лента
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Магазин
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Профиль
      </NavLink>
    </div>
  )
}

export default Tabs
