import { NavLink } from "react-router-dom";

import "./Sidebar.css";



// componente responsável pelo menu lateral
// controla a navegação principal da aplicação

export default function Sidebar() {


    return (

        <aside className="sidebar">


            <div className="sidebar-header">


                <h2>
                    Controle de Gastos
                </h2>


                <span>
                    Sistema residencial
                </span>


            </div>




            <nav>


                <NavLink to="/">

                    Dashboard

                </NavLink>



                <NavLink to="/pessoas">

                    Pessoas

                </NavLink>



                <NavLink to="/transacoes">

                    Transações

                </NavLink>



                <NavLink to="/relatorios">

                    Relatórios

                </NavLink>


            </nav>



        </aside>


    );


}