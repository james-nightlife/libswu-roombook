import { Outlet } from "react-router-dom";
import ENavbar from "../components/ENavbar";

function Layout({token}){
    return(
        <>
            <ENavbar token={token} />
            <Outlet />
        </>
    );
}

export default Layout;