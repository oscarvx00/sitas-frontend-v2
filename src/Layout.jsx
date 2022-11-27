import { Outlet } from "react-router-dom";
import './styles.css'

const Layout = () => {
  return (
    <div className="router-container">
      <Outlet />
    </div>
  )
};

export default Layout;
