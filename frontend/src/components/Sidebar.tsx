import { Link } from "react-router-dom";

export default function Sidebar() {

    // componente responsável pelo menu lateral da aplicação

    return (
        <aside>

            <h2>
                Controle de Gastos
            </h2>


            <nav>

                {/* link para página inicial */}
                <Link to="/">
                    Dashboard
                </Link>


                {/* link para cadastro e consulta de pessoas */}
                <Link to="/pessoas">
                    Pessoas
                </Link>


                {/* link para gerenciamento das transações */}
                <Link to="/transacoes">
                    Transações
                </Link>


                {/* link para visualização dos relatórios */}
                <Link to="/relatorios">
                    Relatórios
                </Link>

            </nav>

        </aside>
    );
}