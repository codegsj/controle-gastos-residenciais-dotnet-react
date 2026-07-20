import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function MainLayout() {


    // layout principal da aplicação
    // responsável por manter elementos fixos
    // enquanto as páginas mudam


    return (

        <div>


            {/* menu lateral fixo */}
            <Sidebar />


            {/* área onde as páginas serão renderizadas */}
            <main>

                <Outlet />

            </main>


        </div>

    );
}