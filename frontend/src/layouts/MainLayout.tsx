import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import "./MainLayout.css";


export default function MainLayout() {


    // layout principal da aplicação
    // mantém o menu fixo
    // e altera somente o conteúdo das páginas


    return (

        <div className="layout">


            {/* menu lateral */}
            <Sidebar />


            {/* conteúdo das páginas */}
            <main className="content">


                <Outlet />


            </main>


        </div>

    );

}