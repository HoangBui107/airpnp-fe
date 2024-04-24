import { Outlet } from "react-router-dom";
import Menu from "../../layout/menu/Menu";
import AdminNavbar from "../../layout/navbar/AdminNavbar"

const HomeAdmin = () => {
    return (
        <>
            <div>
                <AdminNavbar />
                <div className="flex">
                    <div className="w-1/6">
                        <Menu />
                    </div>
                    <div className="flex w-5/6  max-h-[93vh] max-w-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeAdmin;
