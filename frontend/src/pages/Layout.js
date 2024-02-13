import { Outlet } from "react-router-dom";
import ENavbar from "../components/ENavbar";

function Layout(){
    return(
        <>
            <ENavbar />
            <Outlet />
        </>
    );
}

export default Layout;