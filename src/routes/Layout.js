import { Outlet } from "react-router-dom";
import ENavbar from "../components/ENavbar";

function Layout({user}){
    return(
        <>
            <ENavbar user={user} />
            <Outlet />
        </>
    );
}

export default Layout;