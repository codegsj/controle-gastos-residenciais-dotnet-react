import { Link } from "react-router-dom";

import "./Sidebar.css";


export default function Sidebar() {


    // componente responsável pelo menu lateral
    // da aplicação


    return (

        <aside className="sidebar">


            <h2>
                Controle de Gastos
            </h2>


            <nav>


                {/* acesso ao dashboard */}
                <Link to="/">
                    Dashboard
                </Link>


                {/* acesso ao gerenciamento de pessoas */}
                <Link to="/pessoas">
                    Pessoas
                </Link>


                {/* acesso ao gerenciamento das transações */}
                <Link to="/transacoes">
                    Transações
                </Link>


                {/* acesso aos relatórios */}
                <Link to="/relatorios">
                    Relatórios
                </Link>


            </nav>


        </aside>

    );

}